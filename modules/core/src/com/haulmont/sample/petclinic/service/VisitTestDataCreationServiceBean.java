package com.haulmont.sample.petclinic.service;

import com.haulmont.cuba.core.global.DataManager;
import com.haulmont.cuba.core.global.LoadContext;
import com.haulmont.sample.petclinic.core.VisitTestDataCreation;
import com.haulmont.sample.petclinic.entity.visit.Visit;
import javax.inject.Inject;
import org.springframework.stereotype.Service;

@Service(VisitTestDataCreationService.NAME)
public class VisitTestDataCreationServiceBean implements VisitTestDataCreationService {

    @Inject
    protected VisitTestDataCreation visitTestDataCreation;

    @Inject
    protected DataManager dataManager;

    @Override
    public void createVisits() {
        visitTestDataCreation.createData();
    }

    @Override
    public boolean necessaryToCreateVisitTestData() {
        final long amountOfVisits = dataManager.getCount(LoadContext.create(Visit.class));
        return amountOfVisits == 0;
    }
}