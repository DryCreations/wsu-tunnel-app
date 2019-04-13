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
            <select>
                <option value="Russ">Russ Engineering Center</option>
                <option value="Allyn">Allyn Hall</option>
                <option value="Millett">Millett Hall</option>
                <option value="Fawcet">Fawcet Hall</option>
                <option value="Oelman">Oelman Hall</option>
            </select>
        </div>
    )
  }
}

export default SelectTo;
