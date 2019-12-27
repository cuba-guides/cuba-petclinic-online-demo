import {Button, Modal} from "antd";
import * as React from "react";
import {observer} from "mobx-react";
import './AppHeader.css';
import {injectMainStore, MainStoreInjected} from "@cuba-platform/react";

@injectMainStore
@observer
class AppHeader extends React.Component<MainStoreInjected> {

  render() {
    const appState = this.props.mainStore!;

    return (
      <div className="AppHeader">
        <div style={{fontSize: '24px'}}>
          <span style={{color: '#1892cf'}}><strong>CUBA</strong> </span>
          <span style={{color: '#7cc2e5'}}>Petclinic</span>
        </div>
        <div className="user-info">
          <span>{appState.userName}</span>
          <Button ghost={true}
                  icon='logout'
                  style={{border: 0}}
                  onClick={this.showLogoutConfirm}/>
        </div>
      </div>
    )
  }

  showLogoutConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to logout?',
      okText: 'Logout',
      cancelText: 'Cancel',
      onOk: () => {
        this.props.mainStore!.logout()
      }
    });
  }

}

export default AppHeader;
