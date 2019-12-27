import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PetclinicSpecialtyManagementEditor from "./PetclinicSpecialtyEditor";
import {PetclinicSpecialtyBrowser} from "./PetclinicSpecialtyBrowser";

type Props = RouteComponentProps<{entityId?: string}>;

@observer
export class PetclinicSpecialtyManagement extends React.Component<Props> {

  static PATH = '/specialtyManagement';
  static NEW_SUBPATH = 'new';

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId
          ? <PetclinicSpecialtyManagementEditor entityId={entityId}/>
          : <PetclinicSpecialtyBrowser/>}
      </>
    )
  }
}