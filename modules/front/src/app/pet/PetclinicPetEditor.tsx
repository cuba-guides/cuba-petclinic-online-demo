import * as React from "react";
import {FormEvent} from "react";
import {Button, Card, Form, message} from "antd";
import {observer} from "mobx-react";
import {PetclinicPetManagement} from "./PetclinicPetManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction} from "mobx";
import {collection, FormField, instance, Msg} from "@cuba-platform/react";
import {Pet} from "../../cuba/entities/petclinic_Pet";
import {Owner} from "../../cuba/entities/petclinic_Owner";
import {PetType} from "../../cuba/entities/petclinic_PetType";

type Props = FormComponentProps & {
  entityId: string;
};


@observer
class PetclinicPetEditor extends React.Component<Props> {

  dataInstance = instance<Pet>(Pet.NAME, {view: 'pet-with-owner-and-type', loadImmediately: false});
  ownersDc = collection<Owner>(Owner.NAME, {view: '_minimal', sort: 'firstName'});
  petTypesDc = collection<PetType>(PetType.NAME, {view: '_minimal', sort: 'name'});

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = ['identificationNumber', 'birthDate', 'name', 'type', 'generation', 'owner',];

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        message.warn('Validation Error. Please check the data you entered.');
        return;
      }
      this.dataInstance.update(this.props.form.getFieldsValue(this.fields))
        .then(() => {
          message.success('Entity has been updated');
          this.updated = true;
        })
        .catch(() => {
          alert('Error')
        });
    });
  };

  render() {

    if (this.updated) {
      return <Redirect to={PetclinicPetManagement.PATH}/>
    }

    const {getFieldDecorator} = this.props.form;
    const {status} = this.dataInstance;

    return (
      <Card title="Pet" className='editor-layout-narrow'>
        <Form onSubmit={this.handleSubmit}
              layout='vertical'>

          <Form.Item label={<Msg entityName={Pet.NAME} propertyName='identificationNumber'/>}
                     key='identificationNumber'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('identificationNumber', {rules: [{required: true}]})(
              <FormField entityName={Pet.NAME}
                         propertyName='identificationNumber'/>
            )}
          </Form.Item>

          <Form.Item label={<Msg entityName={Pet.NAME} propertyName='birthDate'/>}
                     key='birthDate'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('birthDate')(
              <FormField entityName={Pet.NAME}
                         propertyName='birthDate'/>
            )}
          </Form.Item>

          <Form.Item label={<Msg entityName={Pet.NAME} propertyName='name'/>}
                     key='name'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('name', {rules: [{required: true}]})(
              <FormField entityName={Pet.NAME}
                         propertyName='name'/>
            )}
          </Form.Item>

          <Form.Item label={<Msg entityName={Pet.NAME} propertyName='type'/>}
                     key='type'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('type')(
              <FormField entityName={Pet.NAME}
                         propertyName='type'
                         optionsContainer={this.petTypesDc}/>
            )}
          </Form.Item>

          <Form.Item label={<Msg entityName={Pet.NAME} propertyName='generation'/>}
                     key='generation'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('generation', {rules: [{required: true}]})(
              <FormField entityName={Pet.NAME}
                         propertyName='generation'/>
            )}
          </Form.Item>

          <Form.Item label={<Msg entityName={Pet.NAME} propertyName='owner'/>}
                     key='owner'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('owner')(
              <FormField entityName={Pet.NAME}
                         propertyName='owner'
                         optionsContainer={this.ownersDc}/>
            )}
          </Form.Item>

          <Form.Item style={{textAlign: 'center'}}>
            <Link to={PetclinicPetManagement.PATH}>
              <Button htmlType="button">
                Cancel
              </Button>
            </Link>
            <Button type="primary"
                    htmlType="submit"
                    disabled={status !== "DONE" && status !== "ERROR"}
                    loading={status === "LOADING"}
                    style={{marginLeft: '8px'}}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }

  componentDidMount() {
    if (this.props.entityId !== PetclinicPetManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new Pet());
    }
    this.reactionDisposer = reaction(
      () => {
        return this.dataInstance.item
      },
      () => {
        this.props.form.setFieldsValue(this.dataInstance.getFieldValues(this.fields));
      }
    )
  }

  componentWillUnmount() {
    this.reactionDisposer();
  }

}

export default Form.create<Props>()(PetclinicPetEditor);
