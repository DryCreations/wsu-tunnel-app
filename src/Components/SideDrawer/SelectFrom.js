import React from "react";
import Dropdown from "react-dropdown";
import "./SelectFrom.css";

// const SelectFrom = props => {
//   const options = ["A", "B", "C", "D", "E"];
//   const defaultOption = options[0];

//   return (
//     <div>
//       <p>Select Starting Point:</p>
//       <Dropdown
//         options={options}
//         value={defaultOption}
//         placeholder="Select an option"
//       />
//     </div>
//   );
// };

class SelectFrom extends React.Component {
    render() {
      return(
          <div id="select-from">
            <p>Select starting point:</p>
            <select ref={this.props.selectFromRef} onChange={(e) => {this.props.selectStart(e.target.value);}}>
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

export default SelectFrom;
