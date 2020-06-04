import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PetclinicVetManagementEditor from "./PetclinicVeterinarianEditor";
import {PetclinicVeterinarianBrowser} from "./PetclinicVeterinarianBrowser";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PetclinicVeterinarianManagement extends React.Component<Props> {

  static PATH = '/vetManagement';
  static NEW_SUBPATH = 'new';

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId
          ? <PetclinicVetManagementEditor entityId={entityId}/>
          : <PetclinicVeterinarianBrowser/>}
      </>
    )
  }
}