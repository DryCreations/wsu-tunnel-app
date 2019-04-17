import React from "react";

function HelpPage() {
  return (
    <div>
      <h1>What to Do</h1>
      <ol>
        <li>
          Select a route
          <ul>
            <li>
              Navigate by Touch
              <ol>
                <li>
                  Select an tunnel intersection (green circle) that will
                  represent your start location by tapping it.
                </li>
                <li>
                  Select the tunnel intersection that you believe you wish to
                  navigate to by tapping it.
                </li>
                <li>Press the go button.</li>
              </ol>
            </li>
            <li>
              Navigate using sidebar
              <ol>
                <li>Select a starting building from the dropdown.</li>
                <li>From the nested menu enter your room number or name.</li>
                <li>Repeat steps 1 and 2 for the destination.</li>
                <li>Hide sidebar and select the navigate button.</li>
              </ol>
            </li>
          </ul>
        </li>
        <li>
          Turn by Turn Navigation
          <ol>
            <li>
              After a path has been found by the app, press the next button.
              (You will begin at start node).
            </li>
            <li>
              Press next as many times as needed until you reach your
              destination.
            </li>
            <li>Use the previous button if you lose track of your route.</li>
          </ol>
        </li>
      </ol>
      <p>
      </p>
    </div>
  );
}

export default HelpPage;
