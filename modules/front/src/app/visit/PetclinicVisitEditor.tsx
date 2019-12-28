import * as React from "react";
import {FormEvent} from "react";
import {Button, Card, Form, Input, message} from "antd";
import {observer} from "mobx-react";
import {PetclinicVisitManagement} from "./PetclinicVisitManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction} from "mobx";
import {collection, FormField, instance, Msg} from "@cuba-platform/react";
import {Visit} from "../../cuba/entities/petclinic_Visit";
import {Pet} from "../../cuba/entities/petclinic_Pet";

type Props = FormComponentProps & {
  entityId: string;
};


@observer
class PetclinicVisitEditor extends React.Component<Props> {

  dataInstance = instance<Visit>(Visit.NAME, {view: 'visit-with-pet', loadImmediately: false});
  petsDc = collection<Pet>(Pet.NAME, {view: '_minimal', sort: 'identificationNumber'});

  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = ['visitDate', 'description', 'pet',];

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
      return <Redirect to={PetclinicVisitManagement.PATH}/>
    }

    const {getFieldDecorator} = this.props.form;
    const {status} = this.dataInstance;

    return (
      <Card title="Visit" className='editor-layout-narrow'>
        <Form onSubmit={this.handleSubmit}
              layout='vertical'>

          <Form.Item label={<Msg entityName={Visit.NAME} propertyName='visitDate'/>}
                     key='visitDate'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('visitDate', {rules: [{required: true}]})(
              <FormField entityName={Visit.NAME}
                         propertyName='visitDate'/>
            )}
          </Form.Item>

          <Form.Item label={<Msg entityName={Visit.NAME} propertyName='pet'/>}
                     key='pet'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('pet', {rules: [{required: true}]})(
              <FormField entityName={Visit.NAME}
                         propertyName='pet'
                         optionsContainer={this.petsDc}/>
            )}
          </Form.Item>

          <Form.Item label={<Msg entityName={Visit.NAME} propertyName='description'/>}
                     key='description'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('description')(
              <Input.TextArea autosize={{minRows: 3, maxRows: 5}}/>
            )}
          </Form.Item>

          <Form.Item style={{textAlign: 'center'}}>
            <Link to={PetclinicVisitManagement.PATH}>
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
    if (this.props.entityId !== PetclinicVisitManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new Visit());
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

export default Form.create<Props>()(PetclinicVisitEditor);
