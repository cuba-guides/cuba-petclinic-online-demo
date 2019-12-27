import * as React from "react";
import './HomePage.css';
import logo from '../common/images/petclinic_logo_full.png'

class HomePage extends React.Component {

  render() {
    return (
      <div className="bg-image">
        <img src={logo} alt="CUBA Petclinic"/>
      </div>
    )
  }
}

export default HomePage;