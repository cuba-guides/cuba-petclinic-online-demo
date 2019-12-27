import * as React from "react";
import {observer} from "mobx-react";
import {Button, Modal} from "antd";
import {Owner} from "../../cuba/entities/petclinic_Owner";
import {Link} from "react-router-dom";
import {collection, DataTable} from "@cuba-platform/react";
import {SerializedEntity} from "@cuba-platform/rest";
import {observable} from "mobx";
import {PetclinicOwnerManagement} from "./PetclinicOwnerManagement";

@observer
export class PetclinicOwnerBrowser extends React.Component {

  dataCollection = collection<Owner>(Owner.NAME, {view: '_local', sort: '-updateTs'});
  fields = ['firstName', 'lastName', 'address', 'city', 'email', 'telephone',];

  @observable
  selectedRowKey: string | undefined;

  showDeletionDialog = (e: SerializedEntity<Owner>) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${e._instanceName}?`,
      okText: 'Delete',
      cancelText: 'Cancel',
      onOk: () => {
        this.selectedRowKey = undefined;
        return this.dataCollection.delete(e);
      }
    });
  };

  render() {
    const buttons = (
      [
        (<Link to={PetclinicOwnerManagement.PATH + '/' + PetclinicOwnerManagement.NEW_SUBPATH} key='create'>
          <Button htmlType='button'
                  style={{margin: '0 12px 12px 0'}}
                  type="primary"
                  icon="plus">
            Create
          </Button>
        </Link>),
        (<Link to={PetclinicOwnerManagement.PATH + '/' + this.selectedRowKey} key='edit'>
          <Button htmlType='button'
                  style={{margin: '0 12px 12px 0'}}
                  disabled={!this.selectedRowKey}
                  type='default'>
            Edit
          </Button>
        </Link>),
        (<Button htmlType='button'
                 style={{margin: '0 12px 12px 0'}}
                 disabled={!this.selectedRowKey}
                 onClick={this.deleteSelectedRow}
                 key='remove'
                 type='default'>
          Remove
        </Button>),
      ]
    );

    return (
      <DataTable dataCollection={this.dataCollection}
                 fields={this.fields}
                 onRowSelectionChange={this.handleRowSelectionChange}
                 hideSelectionColumn={true}
                 buttons={buttons}
      />
    );
  }

  getRecordById(id: string): SerializedEntity<Owner> {
    const record: SerializedEntity<Owner> | undefined =
      this.dataCollection.items.find(record => record.id === id);

    if (!record) {
      throw new Error('Cannot find entity with id ' + id);
    }

    return record;
  }

  handleRowSelectionChange = (selectedRowKeys: string[]) => {
    this.selectedRowKey = selectedRowKeys[0];
  };

  deleteSelectedRow = () => {
    this.showDeletionDialog(this.getRecordById(this.selectedRowKey!));
  };
}
