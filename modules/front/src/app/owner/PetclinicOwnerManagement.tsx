import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PetclinicOwnerManagementEditor from "./PetclinicOwnerEditor";
import {PetclinicOwnerBrowser} from "./PetclinicOwnerBrowser";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PetclinicOwnerManagement extends React.Component<Props> {

  static PATH = '/ownerManagement';
  static NEW_SUBPATH = 'new';

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId
          ? <PetclinicOwnerManagementEditor entityId={entityId}/>
          : <PetclinicOwnerBrowser/>}
      </>
    )
  }
}