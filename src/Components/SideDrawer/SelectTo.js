import React from "react";
import Dropdown from "react-dropdown";
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
    return(
        <div id="select-to">
            <p>Select destination:</p>
            <select ref={this.props.selectToRef} onChange={(e) => {this.updateDataList(e.target.options[e.target.selectedIndex].innerHTML);this.props.selectEnd(e.target.value);}}>
              <option value="">[None Selected]</option>
              <option value=".allynHall">Allyn Hall</option>
              <option value=".biologicalSciencesI">Biological Sciences I</option>
              <option value=".biologicalSciencesII">Biological Sciences II</option>
              <option value=".brehmLaboratory">Brehm Laboratory</option>
              <option value=".creativeArtsCenter">Creative Arts Center</option>
              <option value=".diggsLaboratory">Diggs Laboratory</option>
              <option value=".dunbarLibrary">Dunbar Library</option>
              <option value=".fawcettHall">Fawcett Hall</option>
              <option value=".joshiCenter">Joshi Center</option>
              <option value=".libraryAnnex">Library Annex</option>
              <option value=".mathAndMicrobiology">Math And Microbiology</option>
              <option value=".medicalSciences">Medical Sciences</option>
              <option value=".motionPictures">Motion Pictures</option>
              <option value=".oelmanHall">Oelman Hall</option>
              <option value=".rikeHall">Rike Hall</option>
              <option value=".russEngineering">Russ Engineering Center</option>
              <option value=".studentUnion">Student Union</option>
              <option value=".universityHall">University Hall</option>

            </select>
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
        opt.setAttribute('value', rooms[key]);
        opt.innerHTML = key;
        datalist.appendChild(opt);
      }
    } else {
      document.getElementById('roomData').innerHTML = '';
    }

  }
}

export default SelectTo;
