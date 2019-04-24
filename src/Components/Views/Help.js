import React from "react";

function HelpPage() {
  return (
    <div style={{padding: '65px 0px 200px 0px'}}>
      <h1>What to Do</h1>
      <ol>
        <li>
          Select a route
          <ul>
            <li>
              Navigate by Touch
              <ol>
                <li>
                  Select a tunnel intersection (dark green circle) that will
                  represent your starting location by tapping it.
                </li>
                <li>
                  Select the tunnel intersection you wish to
                  navigate to by tapping it.
                </li>
                <li>Press the Go button.</li>
              </ol>
            </li>
            <li>
              Navigate using sidebar
              <ol>
                <li>Select a starting building from the dropdown.</li>
                <li>Select a destination building and optionally, a room number or specific area.</li>
                <li>Press the Go button from the sidebar or from the map.</li>
              </ol>
            </li>
            Set your preferences
            <ol>
                <li>Toggle the first switch to the ON position to prevent using stairs.</li>
                <li>Toggle the second switch to the ON position to use a dark theme.</li>
            </ol>
          </ul>
        </li>
        <li>
          Turn by Turn Navigation
          <ol>
            <li>
              After a path has been found by the app, press the Next button.
              (You will begin at the starting location you selected).
            </li>
            <li>
              Press Next as many times as needed until you reach your
              destination.
            </li>
            <li>Use the Previous button if you lose track of your route.</li>
          </ol>
        </li>
      </ol>
      <p>
      </p>
    </div>
  );
}

export default HelpPage;
