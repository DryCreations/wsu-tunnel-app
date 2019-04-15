import React from "react";
import Dropdown from "react-dropdown";
import "./SelectTo.css";

// const SelectTo = props => {
//   const options = ["A", "B", "C", "D", "E"];
//   const defaultOption = options[0];

//   return (
//     <div>
//       <p>Select Destination</p>
//       <Dropdown
//         options={options}
//         value={defaultOption}
//         placeholder="Select an option"
//       />
//     </div>
//   );
// };

class SelectTo extends React.Component {
  render() {
    return(
        <div id="select-to">
            <p>Select destination:</p>
            <select ref={this.props.selectToRef} onChange={(e) => {this.props.selectEnd(e.target.value);}}>
              <option value="">[None Selected]</option>
              <option value=".russEngineering">Russ Engineering Center</option>
              <option value=".allynHall">Allyn Hall</option>
              <option value=".millettHall">Millett Hall</option>
              <option value=".fawcettHall">Fawcet Hall</option>
              <option value=".oelmanHall">Oelman Hall</option>
            </select>
        </div>
    )
  }
}

export default SelectTo;
