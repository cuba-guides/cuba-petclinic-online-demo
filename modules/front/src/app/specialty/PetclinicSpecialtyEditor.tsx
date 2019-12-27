import * as React from "react";
import {FormEvent} from "react";
import {Button, Card, Form, message} from "antd";
import {observer} from "mobx-react";
import {PetclinicSpecialtyManagement} from "./PetclinicSpecialtyManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction} from "mobx";
import {FormField, instance, Msg} from "@cuba-platform/react";
import {Specialty} from "../../cuba/entities/petclinic_Specialty";

type Props = FormComponentProps & {
  entityId: string;
};


@observer
class PetclinicSpecialtyEditor extends React.Component<Props> {

  dataInstance = instance<Specialty>(Specialty.NAME, {view: '_local', loadImmediately: false});
  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = ['name',];

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
      return <Redirect to={PetclinicSpecialtyManagement.PATH}/>
    }

    const {getFieldDecorator} = this.props.form;
    const {status} = this.dataInstance;

    return (
      <Card title="Specialty" className='editor-layout-narrow'>
        <Form onSubmit={this.handleSubmit}
              layout='vertical'>

          <Form.Item label={<Msg entityName={Specialty.NAME} propertyName='name'/>}
                     key='name'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('name', {rules: [{required: true}]})(
              <FormField entityName={Specialty.NAME}
                         propertyName='name'/>
            )}
          </Form.Item>

          <Form.Item style={{textAlign: 'center'}}>
            <Link to={PetclinicSpecialtyManagement.PATH}>
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
    if (this.props.entityId !== PetclinicSpecialtyManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new Specialty());
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

export default Form.create<Props>()(PetclinicSpecialtyEditor);
