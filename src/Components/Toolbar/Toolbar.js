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
      <div className="toolbar_logo">
        <NavLink to="/Map">CS-3900 Web App</NavLink>
      </div>
      <div className="spacer"> </div>
      <div className="menu_item">
        <NavLink to="/Help">Help</NavLink>
      </div>
      <div className="bar">|</div>
      <div className="menu_item">
        <NavLink to="/Settings">Settings</NavLink>
      </div>
    </nav>
  </header>
);
export default toolbar;
