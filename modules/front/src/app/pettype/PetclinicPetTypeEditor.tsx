import * as React from "react";
import {FormEvent} from "react";
import {Button, Card, Form, Input, message} from "antd";
import {observer} from "mobx-react";
import {PetclinicPetTypeManagement} from "./PetclinicPetTypeManagement";
import {FormComponentProps} from "antd/lib/form";
import {Link, Redirect} from "react-router-dom";
import {IReactionDisposer, observable, reaction} from "mobx";
import {FormField, instance, Msg} from "@cuba-platform/react";
import {PetType} from "../../cuba/entities/petclinic_PetType";

type Props = FormComponentProps & {
  entityId: string;
};


@observer
class PetclinicPetTypeEditor extends React.Component<Props> {

  dataInstance = instance<PetType>(PetType.NAME, {view: '_local', loadImmediately: false});
  @observable
  updated = false;
  reactionDisposer: IReactionDisposer;

  fields = ['name', 'color',];

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
      return <Redirect to={PetclinicPetTypeManagement.PATH}/>
    }

    const {getFieldDecorator} = this.props.form;
    const {status} = this.dataInstance;

    return (
      <Card title="Pet Type" className='editor-layout-narrow'>
        <Form onSubmit={this.handleSubmit}
              layout='vertical'>

          <Form.Item label={<Msg entityName={PetType.NAME} propertyName='name'/>}
                     key='name'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('name', {rules: [{required: true}]})(
              <FormField entityName={PetType.NAME}
                         propertyName='name'/>
            )}
          </Form.Item>

          <Form.Item label={<Msg entityName={PetType.NAME} propertyName='color'/>}
                     key='color'
                     style={{marginBottom: '12px'}}>{
            getFieldDecorator('color', {
              normalize: (value: string) => {
                return value ? (value.startsWith('#') ? value.substring(1) : value).toUpperCase() : value;
              },
              rules: [{
                required: true,
                type: 'hex',
              }]
            })(
              <ColorField/>
            )}
          </Form.Item>

          <Form.Item style={{textAlign: 'center'}}>
            <Link to={PetclinicPetTypeManagement.PATH}>
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
    if (this.props.entityId !== PetclinicPetTypeManagement.NEW_SUBPATH) {
      this.dataInstance.load(this.props.entityId);
    } else {
      this.dataInstance.setItem(new PetType());
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

const ColorField = (props: any) => {
  const {value, onChange} = props;
  let color = value ? '#' + value : undefined;

  return (
    <Input.Group style={{display: 'flex'}}>
      <Input prefix='#' {...props}/>
      <Input style={{width: '32px', marginLeft: '-1px', padding: '0'}}
             type={'color'}
             value={color}
             onChange={onChange}/>
    </Input.Group>
  );
};

export default Form.create<Props>()(PetclinicPetTypeEditor);
