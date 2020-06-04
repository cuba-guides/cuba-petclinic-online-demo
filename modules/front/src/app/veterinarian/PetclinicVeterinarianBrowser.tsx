import * as React from "react";
import {observer} from "mobx-react";
import {Button, Card, Icon, Modal, Spin} from "antd";
import {Veterinarian} from "../../cuba/entities/petclinic_Veterinarian";
import {Link} from "react-router-dom";
import {collection, EntityProperty} from "@cuba-platform/react";
import {SerializedEntity} from "@cuba-platform/rest";
import {PetclinicVeterinarianManagement} from "./PetclinicVeterinarianManagement";

@observer
export class PetclinicVeterinarianBrowser extends React.Component {

  dataCollection = collection<Veterinarian>(Veterinarian.NAME, {view: 'veterinarian-with-specialties', sort: '-updateTs'});
  fields = ['firstName', 'lastName', 'specialties',];

  showDeletionDialog = (e: SerializedEntity<Veterinarian>) => {
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
          <Link to={PetclinicVeterinarianManagement.PATH + '/' + PetclinicVeterinarianManagement.NEW_SUBPATH}>
            <Button type="primary" icon="plus">Create</Button>
          </Link>
        </div>
        {items == null || items.length === 0 ?
          <p>No items available</p> : null}

        {items.map(e =>
          <Card title={e._instanceName}
                key={e.id}
                style={{marginBottom: '12px'}}
                actions={[
                  <Icon type='delete'
                        key='delete'
                        onClick={() => this.showDeletionDialog(e)}/>,
                  <Link to={PetclinicVeterinarianManagement.PATH + '/' + e.id} key='edit'>
                    <Icon type='edit'/>
                  </Link>
                ]}>
            {this.fields.map(p =>
              <EntityProperty entityName={Veterinarian.NAME}
                              propertyName={p}
                              value={e[p]}
                              key={p}/>
            )}
          </Card>
        )}

      </div>
    )
  }
}
