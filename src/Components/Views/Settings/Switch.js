import React, { Component } from "react";

class Switch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      on: props.on
    };
  }

  componentWillMount() {
    this.setState({ on: this.props.on });
  }

  render() {
    /*
    <input
            id={this.props.id + "toggle"}
            ref="switch"
            checked={this.state.isChecked}
            onChange={this._handleChange}
            className="switch"
            type="checkbox"
          />
    */

    return (
      <div className="switch-container">
        <link rel="stylesheet" href="darktheme.css" disabled={!this.state.on} />
        <label>
          {this.props.label}

          <div
            className={"switch" + (this.state.on ? " on" : "")}
            onClick={this._handleChange}
          >
            <div className={"switchToggle" + (this.state.on ? " on" : "")} />
          </div>
        </label>
      </div>
    );
  }

  _handleChange = () => {
    let newOnState = !this.state.on;

    // switch1 toggles wether or not staircases should be used by the navigation algorithm
    if (this.props.id === "switch1") {
      global.useStairs = !newOnState;
    }

    // switch2 toggles whether ot not the dark theme is enabled
    else if (this.props.id === "switch2") {
      // Get stuff to do with the map
      let m = document.getElementById("Map");
      let original = "#f2f1eb";

      // Enable the dark theme
      if (newOnState) {
        m.style.background = "#2a2a2b";
        document.getElementById("Compass").classList.add("invert");
      }

      // Disable the dark theme
      else {
        m.style.background = original;
        document.getElementById("Compass").classList.remove("invert");
      }
    }

    // Toggle whether or not the switch is on
    this.setState({ on: newOnState });
  };
}

export default Switch;
