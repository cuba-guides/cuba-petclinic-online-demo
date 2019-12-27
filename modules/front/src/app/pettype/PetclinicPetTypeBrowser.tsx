import * as React from "react";
import {createElement} from "react";
import {observer} from "mobx-react";
import {Button, Icon, List, Modal, Spin, Tag} from "antd";
import {PetType} from "../../cuba/entities/petclinic_PetType";
import {Link} from "react-router-dom";
import {collection, EntityProperty, injectMainStore} from "@cuba-platform/react";
import {SerializedEntity} from "@cuba-platform/rest";
import {PetclinicPetTypeManagement} from "./PetclinicPetTypeManagement";

@observer
export class PetclinicPetTypeBrowser extends React.Component {

  dataCollection = collection<PetType>(PetType.NAME, {view: '_local', sort: '-updateTs'});
  fields = ['name', 'color',];

  showDeletionDialog = (e: SerializedEntity<PetType>) => {
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
          <Link to={PetclinicPetTypeManagement.PATH + '/' + PetclinicPetTypeManagement.NEW_SUBPATH}>
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
                  <Link to={PetclinicPetTypeManagement.PATH + '/' + item.id} key='edit'>
                    <Icon type='edit'/>
                  </Link>
                ]}>
                  <div style={{flexGrow: 1}}>
                    <EntityProperty entityName={PetType.NAME}
                                    propertyName={'name'}
                                    value={item['name']}
                                    key={'name'}/>
                    <ColorProperty entityName={PetType.NAME}
                                   propertyName={'color'}
                                   value={item['color']}
                                   key={'color'}/>
                  </div>
                </List.Item>
              }/>
      </div>
    )
  }
}

const ColorPropertyFormattedValue = (props: any) => {
  const {entityName, propertyName, value, mainStore, showLabel = true, hideIfEmpty = true,} = props;
  if (hideIfEmpty && value == null) {
    return null;
  }
  if (mainStore == null || mainStore.messages == null || !showLabel) {
    return createElement("div", null, ColorTag(value));
  }
  const {messages} = mainStore;
  const label = messages[entityName + '.' + propertyName];
  return label != null
    ? createElement("div", null,
      createElement("strong", null,
        label,
        ":"),
      " ",
      ColorTag(value))
    : createElement("div", null, ColorTag(value));
};

const ColorTag = (value: String) => {
  return <Tag color={'#' + value}>{value}</Tag>
};

const ColorProperty = injectMainStore(observer((props) =>
  createElement(ColorPropertyFormattedValue, Object.assign({}, props))));
