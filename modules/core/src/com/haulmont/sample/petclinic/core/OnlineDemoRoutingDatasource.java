package com.haulmont.sample.petclinic.core;

import com.haulmont.cuba.core.global.AppBeans;
import com.haulmont.cuba.core.global.UserSessionSource;
import com.haulmont.cuba.core.sys.AppContext;
import com.haulmont.cuba.core.sys.DbInitializationException;
import com.haulmont.cuba.core.sys.DbUpdater;
import com.haulmont.cuba.core.sys.dbupdate.DbUpdaterEngine;
import com.haulmont.cuba.core.sys.persistence.DbmsType;
import com.haulmont.cuba.security.app.UserSessionsAPI;
import com.haulmont.cuba.security.global.UserSession;
import javax.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.jdbc.datasource.AbstractDataSource;
import org.apache.commons.dbcp2.BasicDataSource;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Iterator;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

/**
 * A proxy data source routing to real data sources depending on the current user session.
 */
public class OnlineDemoRoutingDatasource extends AbstractDataSource implements ApplicationContextAware {

    protected Map<String, DataSource> dataSources = new ConcurrentHashMap<>();

    protected ApplicationContext applicationContext;

    protected String urlPrefix;
    protected String defaultDbAddress;
    protected String sampleDataSourceBeanName;

    private Logger log = LoggerFactory.getLogger(OnlineDemoRoutingDatasource.class);

    public String getUrlPrefix() {
        return urlPrefix;
    }

    public void setUrlPrefix(String urlPrefix) {
        this.urlPrefix = urlPrefix;
    }

    public String getDefaultDbAddress() {
        return defaultDbAddress;
    }

    public void setDefaultDbAddress(String defaultDbAddress) {
        this.defaultDbAddress = defaultDbAddress;
    }

    public String getSampleDataSourceBeanName() {
        return sampleDataSourceBeanName;
    }

    public void setSampleDataSourceBeanName(String sampleDataSourceBeanName) {
        this.sampleDataSourceBeanName = sampleDataSourceBeanName;
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }

    protected DataSource createDataSource(String dbAddress) {
        log.info("Creating datasource for {}", dbAddress);
        BasicDataSource ds = (BasicDataSource) applicationContext.getBean(sampleDataSourceBeanName);
        ds.setUrl(urlPrefix + dbAddress);

        DbUpdater dbUpdater = new DbUpdaterEngine() {
            {
                dbScriptsDirectory = AppContext.getProperty("cuba.dbDir");
                dbmsType = DbmsType.getType();
                dbmsVersion = DbmsType.getVersion();
            }

            @Override
            public DataSource getDataSource() {
                return ds;
            }
        };
        try {
            dbUpdater.updateDatabase();
        } catch (DbInitializationException e) {
            throw new RuntimeException("Error initializing database " + urlPrefix + dbAddress, e);
        }

        return ds;
    }

    protected DataSource determineTargetDataSource() {
        UserSessionSource uss = AppBeans.get(UserSessionSource.class);
        String key = uss.checkCurrentUserSession() ? uss.getUserSession().getId().toString() : defaultDbAddress;
        log.debug("Using DB address: {}", key);
        return dataSources.computeIfAbsent(key, this::createDataSource);
    }

    @Override
    public Connection getConnection() throws SQLException {
        return determineTargetDataSource().getConnection();
    }

    @Override
    public Connection getConnection(String username, String password) throws SQLException {
        return determineTargetDataSource().getConnection(username, password);
    }

    public void cleanup() {
        log.debug("Cleaning up user datasources (" + dataSources.size() + ")");
        Iterator<Map.Entry<String, DataSource>> iterator = dataSources.entrySet().iterator();
        while (iterator.hasNext()) {
            Map.Entry<String, DataSource> entry = iterator.next();
            if (entry.getKey().equals(defaultDbAddress))
                continue;

            UUID sessionId = UUID.fromString(entry.getKey());
            UserSessionsAPI userSessions = (UserSessionsAPI) applicationContext.getBean(UserSessionsAPI.NAME);
            UserSession userSession = userSessions.get(sessionId);
            if (userSession == null) {
                log.debug("Session " + entry.getKey() + " does not exist, removing the datasource");
                DataSource dataSource = entry.getValue();
                try {
                    Statement statement = dataSource.getConnection().createStatement();
                    statement.executeUpdate("SHUTDOWN");
                } catch (SQLException e) {
                    log.warn("Error shutting down database " + entry.getKey());
                }
                try {
                    ((BasicDataSource) dataSource).close();
                } catch (SQLException e) {
                    log.warn("Error closing datasource " + entry.getKey());
                }
                iterator.remove();
            }
        }
    }
}