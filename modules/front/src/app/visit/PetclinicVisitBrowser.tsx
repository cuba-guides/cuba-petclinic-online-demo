import * as React from "react";
import {observer} from "mobx-react";
import {Button, Card, Icon, Modal, Spin, notification} from "antd";
import {Visit} from "../../cuba/entities/petclinic_Visit";
import {Link} from "react-router-dom";
import {collection, EntityProperty} from "@cuba-platform/react";
import {SerializedEntity} from "@cuba-platform/rest";
import {PetclinicVisitManagement} from "./PetclinicVisitManagement";
import {restServices} from "../../cuba/services";
import {cubaREST} from "../../index";
import {observable} from "mobx";

@observer
export class PetclinicVisitBrowser extends React.Component {

  dataCollection = collection<Visit>(Visit.NAME, {view: 'visit-with-pet', sort: '-updateTs'});
  fields = ['visitDate', 'pet', 'description',];

  @observable
  isGeneratingTestData = false;

  showDeletionDialog = (e: SerializedEntity<Visit>) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${e._instanceName}?`,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => {
        return this.dataCollection.delete(e);
      }
    });
  };

  generateTestData = () => {
    this.isGeneratingTestData = true;
    restServices.petclinic_VisitTestDataCreationService.createVisits(cubaREST)()
    .then((result) => {
      this.isGeneratingTestData = false;
      this.dataCollection.load();
      notification.success({
        message: 'Visit Test Data',
        description:
          'Visit Test Data created... 👍'
      });
    });
  };

  render() {
    const {
      status,
      items
    } = this.dataCollection;

    if (status === "LOADING" || this.isGeneratingTestData) {
      return (<div
        style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)'}}>
        <Spin size='large'/>
      </div>);
    }


    return (
      <div className='page-layout-narrow'>
        <div style={{marginBottom: '12px'}}>
          <Link to={PetclinicVisitManagement.PATH + '/' + PetclinicVisitManagement.NEW_SUBPATH}>
            <Button type="primary" icon="plus">Create</Button>
          </Link>
          {items == null || items.length === 0 ?
            <Button style={{marginLeft: '5px'}} onClick={() => this.generateTestData()}>
              Generate Test Data
            </Button> : null}

        </div>
        {items == null || items.length === 0 ?
          <p>
            No items available.
          </p> : null}

        {items.map(e =>
          <Card title={e._instanceName}
                key={e.id}
                style={{marginBottom: '12px'}}
                actions={[
                  <Icon type='delete'
                        key='delete'
                        onClick={() => this.showDeletionDialog(e)}/>,
                  <Link to={PetclinicVisitManagement.PATH + '/' + e.id} key='edit'>
                    <Icon type='edit'/>
                  </Link>
                ]}>
            {this.fields.map(p =>
              <EntityProperty entityName={Visit.NAME}
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
