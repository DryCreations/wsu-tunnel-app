import React from "react";
import "./SideDrawer.css";
import SelectFrom from "./SelectFrom";
import SelectTo from "./SelectTo";
import Pilot from "../Images/pilot_wsu_logo.png";

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
            <SelectFrom selectFromRef={props.selectFromRef} selectStart={props.selectStart} />
          </li>
          <li>
            <SelectTo selectToRef={props.selectToRef} selectEnd={props.selectEnd}/>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default sideDrawer;
