import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PetclinicPetTypeManagementEditor from "./PetclinicPetTypeEditor";
import {PetclinicPetTypeBrowser} from "./PetclinicPetTypeBrowser";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PetclinicPetTypeManagement extends React.Component<Props> {

  static PATH = '/petTypeManagement';
  static NEW_SUBPATH = 'new';

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId
          ? <PetclinicPetTypeManagementEditor entityId={entityId}/>
          : <PetclinicPetTypeBrowser/>}
      </>
    )
  }
}