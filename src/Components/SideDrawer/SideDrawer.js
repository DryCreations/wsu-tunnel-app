import React from "react";
import "./SideDrawer.css";
import SelectFrom from "./SelectFrom";
import SelectTo from "./SelectTo";
import Pilot from "../Images/pilot_wsu_logo.png";
import Switch from "../Views/Settings/Switch";
import "../Views/Settings/Switch.css";

const sideDrawer = props => {
  let drawerClasses = "sideDrawer";
  if (props.show) {
    drawerClasses = "sideDrawer open";
  }

  return (
    <div>
      <nav className={drawerClasses}>
        <header className={"myHeader"}>
            <img src={Pilot} alt="Pilot" onClick={props.clicky} />
        </header>

        <ul>
          <li>
            <SelectFrom />
          </li>
          <li>
            <SelectTo />
            <Switch label="Use elevators only (no stairs)" id="1"/>
            <Switch label="Show bathrooms" id="2"/>
            <Switch label="Enable Dark Theme" id="3"/>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default sideDrawer;
