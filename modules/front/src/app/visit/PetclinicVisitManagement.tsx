import * as React from "react";
import {RouteComponentProps} from "react-router";
import {observer} from "mobx-react";
import PetclinicVisitManagementEditor from "./PetclinicVisitEditor";
import {PetclinicVisitBrowser} from "./PetclinicVisitBrowser";

type Props = RouteComponentProps<{ entityId?: string }>;

@observer
export class PetclinicVisitManagement extends React.Component<Props> {

  static PATH = '/visitManagement';
  static NEW_SUBPATH = 'new';

  render() {
    const {entityId} = this.props.match.params;
    return (
      <>
        {entityId
          ? <PetclinicVisitManagementEditor entityId={entityId}/>
          : <PetclinicVisitBrowser/>}
      </>
    )
  }
}