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
            <SelectFrom
              selectFromRef={props.selectFromRef}
              selectStart={props.selectStart}
            />
            <SelectTo
              ref={props.selectToObjectRef}
              selectToRef={props.selectToRef}
              selectToRoomRef={props.selectToRoomRef}
              selectEnd={props.selectEnd}
            />
            <button
              style={{
                position: "relative",
                left: "20%",
                marginTop: "20px",
                height: "30px",
                width: "60px"
              }}
              onClick={props.navigateFunction}
            >
              Go
            </button>
          </li>
          <li>
            <Switch label="Use elevators only (no stairs)" id="switch1" />
            {/* <Switch label="Show bathrooms" id="2"/> */}
            <Switch label="Enable Dark Theme" id="switch2" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default sideDrawer;
