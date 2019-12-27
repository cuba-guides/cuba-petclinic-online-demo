import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PetclinicPetManagementEditor from "./PetclinicPetEditor";
import {PetclinicPetBrowser} from "./PetclinicPetBrowser";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PetclinicPetManagement extends React.Component<Props> {

  static PATH = '/petManagement';
  static NEW_SUBPATH = 'new';

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId
          ? <PetclinicPetManagementEditor entityId={entityId}/>
          : <PetclinicPetBrowser/>}
      </>
    )
  }
}