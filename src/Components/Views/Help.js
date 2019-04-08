import React, {Component} from 'react';
import "./Help.css";

class Help extends Component{
    render(){
        return(
            <p>
                <div id="What to Do">
                    <h1 id="What to Do">What to Do</h1>
                </div>
                <ol>
                    <li>Select a route
                        <ul>
                            <li>Navigate by Touch
                                <ol>
                                    <li>Select a node (green circle) that will represent your start location.</li>
                                    <li>Select the node that you believe you wish to navigate to.</li>
                                    <li>Select the navigate button.</li>
                                </ol>
                            </li>
                            <li>Navigate using sidebar
                                <ol>
                                    <li>Select a starting building from the dropdown.</li>
                                    <li>From the nested menu enter your room number or name.</li>
                                    <li>Repeat steps 1 and 2 for the destination.</li>
                                    <li>Hide sidebar and select the navigate button.</li>
                                </ol>
                            </li>
                        </ul>
                    </li>
                    <li>Turn by Turn Navigation
                        <ol>
                            <li>Select the next button. (You will begin at start node).</li>
                            <li>Press next as many times as needed until you reach your destination.</li>
                            <li>Use the previous button if lost track of route.</li>
                        </ol>
                    </li>
                </ol>
            </p>
        );
    }
};

export default Help;
