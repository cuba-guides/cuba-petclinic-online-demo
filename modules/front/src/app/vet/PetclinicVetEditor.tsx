import * as React from "react";
import {FormEvent} from "react";
import {Button, Card, Form, message} from "antd";
import {observer} from "mobx-react";
import {PetclinicVetManagement} from "./PetclinicVetManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction} from "mobx";
import {collection, FormField, instance, Msg} from "@cuba-platform/react";
import {Vet} from "../../cuba/entities/petclinic_Vet";
import {Specialty} from "../../cuba/entities/petclinic_Specialty";

type Props = FormComponentProps & {
  entityId: string;
};


@observer
class PetclinicVetEditor extends React.Component<Props> {

  dataInstance = instance<Vet>(Vet.NAME, {view: 'vet-with-specialties', loadImmediately: false});
  specialtiesDc = collection<Specialty>(Specialty.NAME, {view: '_minimal', sort: 'name'});

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = ['firstName', 'lastName', 'specialties',];

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
      return <Redirect to={PetclinicVetManagement.PATH}/>
    }

    const {getFieldDecorator} = this.props.form;
    const {status} = this.dataInstance;

    return (
      <Card title="Veterinarian" className='editor-layout-narrow'>
        <Form onSubmit={this.handleSubmit}
              layout='vertical'>

          <Form.Item label={<Msg entityName={Vet.NAME} propertyName='firstName'/>}
                     key='firstName'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('firstName', {rules: [{required: true}]})(
              <FormField entityName={Vet.NAME}
                         propertyName='firstName'/>
            )}
          </Form.Item>

          <Form.Item label={<Msg entityName={Vet.NAME} propertyName='lastName'/>}
                     key='lastName'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('lastName')(
              <FormField entityName={Vet.NAME}
                         propertyName='lastName'/>
            )}
          </Form.Item>

          <Form.Item label={<Msg entityName={Vet.NAME} propertyName='specialties'/>}
                     key='specialties'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('specialties')(
              <FormField entityName={Vet.NAME}
                         propertyName='specialties'
                         optionsContainer={this.specialtiesDc}/>
            )}
          </Form.Item>

          <Form.Item style={{textAlign: 'center'}}>
            <Link to={PetclinicVetManagement.PATH}>
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
    if (this.props.entityId !== PetclinicVetManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new Vet());
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

export default Form.create<Props>()(PetclinicVetEditor);
