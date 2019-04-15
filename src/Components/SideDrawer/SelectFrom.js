import React from "react";
import Dropdown from "react-dropdown";
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
      return(
          <div id="select-from">
            <p>Select starting point:</p>
            <select ref={this.props.selectFromRef} onChange={(e) => {this.props.selectStart(e.target.value);}}>
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
              <option value=".millettHall">Millett Hall</option>
              <option value=".motionPictures">Motion Pictures</option>
              <option value=".oelmanHall">Oelman Hall</option>
              <option value=".rikeHall">Rike Hall</option>
              <option value=".russEngineering">Russ Engineering Center</option>
              <option value=".studentUnion">Student Union</option>
              <option value=".universityHall">University Hall</option>
            </select>
            <input ref={this.props.selectFromRoomRef} type='text' id='fromRoom'/>
          </div>
      )
    }
  }

export default SelectFrom;
