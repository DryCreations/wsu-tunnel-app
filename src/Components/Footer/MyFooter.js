import React from "react";
import "./MyFooter.css";

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyFooter = props => {
  return (
    <div>
      <head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
          crossOrigin="anonymous"
        />
      </head>

      <footer className="linkBar">
        <nav className="linkBar_nav">
          <div className="spacer" />
          <div>
            <ul className={"Links"}>
              <li>
                <a href="http://www.facebook.com/WrightStateUniversity">
                  <i className="fab fa-facebook" />
                </a>
              </li>
              <li>
                <a href="http://worldartsme.com/images/tombstone-clipart-1.jpg" title="RIP Google+">
                  <i className="fab fa-google-plus-square" />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/wrightstateu/">
                  <i className="fab fa-instagram" />
                </a>
              </li>
              <li>
                <a href="http://www.linkedin.com/companies/wright-state-university">
                  <i className="fab fa-linkedin" />
                </a>
              </li>
              <li>
                <a href="https://www.snapchat.com/add/wrightstateu">
                  <i className="fab fa-snapchat-square" />
                </a>
              </li>
              <li>
                <a href="http://twitter.com/WrightState">
                  <i className="fab fa-twitter-square" />
                </a>
              </li>
              <li>
                <a href="http://www.youtube.com/WrightStateU">
                  <i className="fab fa-youtube-square" />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </footer>
    </div>
  );
};
export default MyFooter;
