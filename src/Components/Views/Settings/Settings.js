import React, { Component } from "react";
import Switch from "./Switch";
import "./Switch.css";

class Settings extends Component {
  render() {
    return (
      <div>
        <Switch
          ref="switch"
          checked={false}
          onChange={this._handleChange}
          className="switch"
          type="checkbox"
        />
      </div>
    );
  }
}
export default Settings;
