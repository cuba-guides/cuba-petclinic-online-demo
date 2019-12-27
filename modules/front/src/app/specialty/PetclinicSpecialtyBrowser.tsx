import * as React from "react";
import {observer} from "mobx-react";
import {Button, Icon, List, Modal, Spin} from "antd";
import {Specialty} from "../../cuba/entities/petclinic_Specialty";
import {Link} from "react-router-dom";
import {collection, EntityProperty} from "@cuba-platform/react";
import {SerializedEntity} from "@cuba-platform/rest";
import {PetclinicSpecialtyManagement} from "./PetclinicSpecialtyManagement";

@observer
export class PetclinicSpecialtyBrowser extends React.Component {

  dataCollection = collection<Specialty>(Specialty.NAME, {view: '_local', sort: '-updateTs'});
  fields = ['name',];

  showDeletionDialog = (e: SerializedEntity<Specialty>) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${e._instanceName}?`,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => {
        return this.dataCollection.delete(e);
      }
    });
  };

  render() {
    const {
      status,
      items
    } = this.dataCollection;

    if (status === "LOADING") {
      return (<div style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
        <Spin size='large'/>
      </div>);
    }

    return (
      <div className='page-layout-narrow'>
        <div style={{marginBottom: '12px'}}>
          <Link to={PetclinicSpecialtyManagement.PATH + '/' + PetclinicSpecialtyManagement.NEW_SUBPATH}>
            <Button type="primary" icon="plus">Create</Button>
          </Link>
        </div>
        {items == null || items.length === 0 ?
          <p>No items available</p> : null}

         <List itemLayout="horizontal"
            bordered
            dataSource={items}
            style={{background: '#fff'}}
            renderItem={item =>
              <List.Item actions={[
                  <Icon type='delete'
                        key='delete'
                        onClick={() => this.showDeletionDialog(item)}/>,
                  <Link to={PetclinicSpecialtyManagement.PATH + '/' + item.id} key='edit'>
                    <Icon type='edit'/>
                  </Link>
              ]}>
                <div style={{flexGrow: 1}}>
                {this.fields.map(p =>
                  <EntityProperty entityName={Specialty.NAME}
                                  propertyName={p}
                                  value={item[p]}
                                  key={p}/>
                )}
                </div>
              </List.Item>
            }/>

      </div>
    )
  }
}
