import React from "react";
import "./Toolbar.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import { NavLink } from "react-router-dom";

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar_nav">
      <div>
        <DrawerToggleButton click={props.drawerClick} />
      </div>
      <button className="menu_item" onClick={props.toMap}>Tunnel Raider</button>
      <div className="spacer"> </div>
      <button className="menu_item" onClick={props.toHelp}>Help</button>
      <div className="bar">|</div>
      <button className="menu_item" onClick={props.toSettings}>Settings</button>
    </nav>
  </header>
);
export default toolbar;
