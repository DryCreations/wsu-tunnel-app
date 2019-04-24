import React, { Component } from "react";

class Switch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      on: false
    };
    
  }

  componentWillMount() {
    this.setState({ isChecked: this.props.isChecked });
  }

  render() {

    return (
      <div className="switch-container">
        <label>{this.props.label}
          <input
            ref="switch"
            checked={this.state.isChecked}
            onChange={this._handleChange}
            className="switch"
            type="checkbox"
          />
          <div>
            <div />
          </div>
        </label>
      </div>
    );
  }

  _handleChange = () => {
    this.setState({ isChecked: !this.state.isChecked });
    let m = document.getElementById("Map");
    let original = "#f2f1eb";
    if (this.props.id==="2") {
      if (this.state.on) {
        this.setState({on: false})
        m.style.background = original;
      }
      else {
        this.setState({on: true})
        m.style.background = "#2a2a2b";
      }
    }
  };
}

export default Switch;
