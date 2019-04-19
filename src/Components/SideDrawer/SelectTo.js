import React from "react";
// import Dropdown from "react-dropdown";
import "./SelectTo.css";

import BuildingRooms from '../../building-roomKeys.json';

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
    var options = [];
    options.push(<option key="to None Selected" value={""}>{"[None Selected]"}</option>)
    for(let b in BuildingRooms) {
        options.push(<option key={"to" + b} value={BuildingRooms[b]["Class"]}>{b}</option>);
    }
    return(
        <div id="select-to">
            <p>Select destination:</p>
            <select ref={this.props.selectToRef} onChange={(e) => {this.updateDataList(e.target.options[e.target.selectedIndex].innerHTML);this.props.selectEnd(e.target.value);}}>
              {options}
            </select>
            <br/>
            <input ref={this.props.selectToRoomRef} type='text' id='toRoom' placeholder='room number' list='roomData'/>
            <datalist id='roomData'/>
        </div>
    )
  }

  updateDataList(e) {
    var rooms = BuildingRooms[e];


    if (rooms && rooms["Rooms"]) {
      rooms = rooms["Rooms"];
      let datalist = document.getElementById('roomData');
      datalist.innerHTML = '';
      for(var key in rooms) {
        let opt = document.createElement('option');
        opt.setAttribute('value', key);
        opt.innerHTML = rooms[key];
        datalist.appendChild(opt);
      }
    } else {
      document.getElementById('roomData').innerHTML = '';
    }

  }
}

export default SelectTo;
