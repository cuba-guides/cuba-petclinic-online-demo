import * as React from 'react';
import './App.css';

import {Icon, Layout, Menu} from "antd";
import {observer} from "mobx-react";
import Login from "./login/Login";
import Centered from "./common/Centered";
import AppHeader from "./header/AppHeader";
import {NavLink, Route, Switch} from "react-router-dom";
import HomePage from "./home/HomePage";
import {menuItems} from "../routing";
import {injectMainStore, MainStoreInjected, RouteItem, SubMenu} from "@cuba-platform/react";

@injectMainStore
@observer
class App extends React.Component<MainStoreInjected> {

  render() {

    const mainStore = this.props.mainStore!;
    const {initialized, loginRequired} = mainStore;

    if (!initialized) {
      return (
        <Centered>
          <Icon type="loading" style={{fontSize: 24}} spin={true}/>
        </Centered>
      )
    }

    if (loginRequired) {
      return (
        <Centered>
          <Login/>
        </Centered>
      )
    }

    const menuIndex = 1;

    return (
      <Layout className='main-layout'>
        <Layout.Header style={{height: '48px', lineHeight: '48px', padding: '0 12px'}}>
          <AppHeader/>
        </Layout.Header>
        <Layout>
          <Layout.Sider width={200}
                        breakpoint='sm'
                        collapsedWidth={0}
                        style={{background: '#fff'}}>
            <Menu mode="inline"
                  style={{height: '100%', borderRight: 0}}>
              <Menu.Item key={menuIndex}>
                <NavLink to={'/'}><Icon type="home"/>Home</NavLink>
              </Menu.Item>
              {menuItems.map((item, index) => menuItem(item, '' + (index + 1 + menuIndex)))}
            </Menu>
          </Layout.Sider>
          <Layout style={{padding: '24px 24px 24px'}}>
            <Layout.Content>
              <Switch>
                <Route exact={true} path="/" component={HomePage}/>
                {collectRouteItems(menuItems).map(route => (
                  <Route
                    key={route.pathPattern}
                    path={route.pathPattern}
                    component={route.component}
                  />
                ))}
              </Switch>
            </Layout.Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

function menuItem(item: RouteItem | SubMenu, keyString: string) {
  // Sub Menu

  if ((item as any).items != null) {
    //recursively walk through sub menus
    return (
      <Menu.SubMenu key={keyString}
                    title={item.caption}>
        {(item as SubMenu).items.map((ri, index) =>
          menuItem(ri, keyString + '-' + (index + 1)))}
      </Menu.SubMenu>
    );
  }

  // Route Item

  const {menuLink} = item as RouteItem;

  return (
    <Menu.Item key={keyString}>
      <NavLink to={menuLink}>
        <Icon type="bars"/>
        {item.caption}
      </NavLink>
    </Menu.Item>
  );
}

function collectRouteItems(items: Array<RouteItem | SubMenu>): RouteItem[] {
  return items.reduce(
    (acc, curr) => {
      if ((curr as SubMenu).items == null) {
        // Route item
        acc.push(curr as RouteItem);
      } else {
        // Items from sub menu
        acc.push(...collectRouteItems((curr as SubMenu).items));
      }
      return acc;
    },
    [] as Array<RouteItem>
  );
}

export default App;
