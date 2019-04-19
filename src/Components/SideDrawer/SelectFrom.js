import React from "react";
// import Dropdown from "react-dropdown";
import "./SelectFrom.css";

import BuildingRooms from '../../building-roomKeys.json';

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
      var options = [];
      options.push(<option key="from None Selected" value={""}>{"[None Selected]"}</option>)
      for(let b in BuildingRooms) {
          options.push(<option key={"from" + b} value={BuildingRooms[b]["Class"]}>{b}</option>);
      }

      return(
          <div id="select-from">
            <p>Select starting point:</p>
            <select ref={this.props.selectFromRef} onChange={(e) => {this.props.selectStart(e.target.value);}}>
              {options}
            </select>

          </div>
      )
    }
  }

export default SelectFrom;
