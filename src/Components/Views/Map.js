import React, { Component } from "react";
import { HashRouter, Route, Redirect } from "react-router-dom";
import { ReactComponent as MapSVG } from "../Maps/map.svg";
import "./Map.css";

import Toolbar from "../Toolbar/Toolbar.js";
import SideDrawer from "../SideDrawer/SideDrawer.js";
import Backdrop from "../Backdrop/Backdrop.js";
import MyFooter from "../Footer/MyFooter";

import Settings from "./Settings/Settings";
import HelpPage from "./Help.js";

class Map extends Component {
  constructor(props) {
    super(props);

    var sel = [null, null];
    this.selected = sel;
    this.o1 = null;
    this.o2 = null;
    this.animationStack = [];
    this.animating = false;
    this.pathNodes = null;
    this.pathEdges = null;
    this.currNodes = 0;
    this.defaultViewBoxArgs = "0 0 640 480";

    this.state = {
      direction: "Tap to select a start and end location",
      sideDrawerOpen: false,
      displayMap: "block",
      displaySettings: "none",
      displayHelp: "none"
    };

    //bind touch events to this object
    this.onPointerDown = this.onPointerDown.bind(this);
    this.onPointerUp = this.onPointerUp.bind(this);
    this.onPointerMove = this.onPointerMove.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onTouchDown = this.onTouchDown.bind(this);
    this.onTouchUp = this.onTouchUp.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);

    //resize svg when window resizes to stay responsive
    window.addEventListener("resize", this.initViewBoxDimensions.bind(this));

    window.mapComponent = this; //call functions by window.mapComponent.{Function call here}
  }

  drawerToggleClickHandler = () => {
    this.setState({ sideDrawerOpen: true });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  displayMapHandler = () => {
    this.setState({
      displayMap: "block",
      displaySettings: "none",
      displayHelp: "none"
    });
  };

  displayHelpHandler = () => {
    this.setState({
      displayMap: "none",
      displaySettings: "none",
      displayHelp: "block"
    });
  };

  displaySettingsHandler = () => {
    this.setState({
      displayMap: "none",
      displaySettings: "block",
      displayHelp: "none"
    });
  };

  //render map to screen
  render() {
    let backdrop;


    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop clicky={this.backdropClickHandler} />;
    }

    return (
      <div style={{ height: "100%" }}>
        <Toolbar
          drawerClick={this.drawerToggleClickHandler}
          toMap={this.displayMapHandler}
          toHelp={this.displayHelpHandler}
          toSettings={this.displaySettingsHandler}
        />
        <SideDrawer
          show={this.state.sideDrawerOpen}
          clicky={this.backdropClickHandler}
        />
        {backdrop}
        <div id="MapContainer" style={{display: this.state.displayMap}}>
          <MapSVG />

          <div id="Directions">
            <p>{this.state.direction}</p>
          </div>
          <button id="NavigateButton"
            onClick={() =>
              this.getPath(this.getStartPointID(), this.getEndPointID())
            }
          >
          Navigate
          </button>

          <button id="PreviousViewButton" onClick={() => this.prevStep()}>
            Previous
          </button>

          <button id="NextViewButton" onClick={() => this.nextStep()}>
            Next
          </button>

          <img id="Compass" src="north.png" alt="compass" />
        </div>
        <div style={{display: this.state.displaySettings}}>
          <Settings />
        </div>
        <div style={{display: this.state.displayHelp}}>
          <HelpPage />
        </div>
        <MyFooter />
      </div>
    );
  }

  //update rotation of compass
  updateCompass() {
    var matrix = this.multiplyMatrices(
      this.getUserMatrix(),
      this.getMapMatrix()
    );

    var det = matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1];
    matrix = this.multiplyMatrices(
      this.matrix_invert(this.getScaleMatrix(Math.sqrt(det))),
      matrix
    );

    var angle = Math.atan2(matrix[0][0], matrix[0][1]);

    angle = (angle * 180) / Math.PI - 90;

    document
      .getElementById("Compass")
      .setAttribute(
        "style",
        "transform:rotate(" +
        angle +
        "deg);-webkit-transform:rotate(" +
        angle +
        "deg);-moz-transform:rotate(" +
        angle +
        "deg);-o-transform:rotate(" +
        angle +
        "deg);"
      );
  }

  //scale nodes to maintain a constant size on screen, with a maximum size to avoid overlappnig nodes
  scaleNodes() {
    var size = Math.min(16 / this.getScale(), 2.2);
    //
    // if (size == NaN) {
    //   size = .01;
    // } else {
    // size = Math.max(size, .01)
    // size = Math.min(size, 4);
    // }

    // size = Math.abs(size);

    var scaleString = "scale(" + size + ")";
    document.getElementById("nodeRadius").innerHTML =
      "circle {transform:" +
      scaleString +
      ";-webkit-transform:" +
      scaleString +
      ";-moz-transform:" +
      scaleString +
      ";-o-transform:" +
      scaleString +
      ";}";
    document
      .getElementById("Map")
      .setAttribute("stroke-width", size / 2 + "px");
  }

  //get the overall scale factor of the map by taking the square root of the determinant
  getScale() {
    var m = this.getUserMatrix();
    // var s = m[0][0] / Math.sqrt(Math.abs(1 - m[0][1] ** 2));
    // var s = m[0][0] / Math.cos(Math.asin(m[0][1]));
    var s = m[0][0] * m[1][1] - m[0][1] * m[1][0];

    var s2 = document.getElementById("TransformMap").getAttribute("style");
    var s3 = 1;
    if (s2) {
      s3 = s2.match("matrix\\((.+?)\\)");
      if (s3) {
        s3 = this.stringToMatrix(s3[1]);
        // s3 = s3[0][0] / Math.sqrt(Math.abs(1 - s3[0][1] ** 2));
        // s3 = s3[0][0] / Math.cos(Math.asin(s3[0][1]));
        s3 = s3[0][0] * s3[1][1] - s3[0][1] * s3[1][0];
      } else {
        s3 = 1;
      }
      s2 = s2.match("scale\\((-?\\d*(:?\\.\\d*)?)\\)");
      if (s2) {
        s2 = s2[1];
      } else {
        s2 = 1;
      }
    } else {
      s2 = 1;
    }

    s = Math.sqrt(s) * s2 * Math.sqrt(s3);

    return s;
  }

  //set onclick for svg elements, called after load
  componentDidMount() {
    Array.from(
      document.getElementById("Map").getElementsByTagName("circle")
    ).forEach(element => {
      if (element.id !== "User") {
        element.onclick = () => {
          this.selectElement(element);
        };
      }
    });

    var map = document.getElementById("Map");

    //bind scroll to zoom function
    map.addEventListener("wheel", this.onScroll);

    //bind events to corresponding functions
    if (window.PointerEvent) {
      map.addEventListener("pointerdown", this.onPointerDown);
      map.addEventListener("pointerup", this.onPointerUp);
      map.addEventListener("pointerleave", this.onPointerUp);
      map.addEventListener("pointermove", this.onPointerMove);
    } else {
      map.addEventListener("mousedown", this.onPointerDown);
      map.addEventListener("mouseup", this.onPointerUp);
      map.addEventListener("mouseleave", this.onPointerUp);
      map.addEventListener("mousemove", this.onPointerMove);

      map.addEventListener("touchstart", this.onTouchDown);
      map.addEventListener("touchend", this.onTouchUp);
      map.addEventListener("touchmove", this.onTouchMove);
    }

    this.initViewBoxDimensions();

    //create style sheet to scale nodes together
    var sheet = document.createElement("style");
    sheet.setAttribute("id", "nodeRadius");
    sheet.innerHTML =
      "circle {transform: scale(1);-webkit-transform:scale(1);-moz-transform:scale(1);-o-transform:scale(1);}";
    if (document.getElementById("nodeRadius"))
      document.head.removeChild(document.getElementById("nodeRadius"));
    document.head.appendChild(sheet);

    //create style sheet for hiding and showing node categories
    var sheet2 = document.createElement("style");
    sheet2.setAttribute("id", "ShowNodes");
    sheet2.innerHTML =
      ".elevator:not(.highlight):not(.selected){visibility:hidden;}.staircase:not(.highlight):not(.selected){visibility:hidden;}.exit:not(.highlight):not(.selected){visibility:hidden;}";
    if (document.getElementById("ShowNodes"))
      document.head.removeChild(document.getElementById("ShowNodes"));
    document.head.appendChild(sheet2);

    this.scaleNodes();
    this.updateCompass();

    var urlParams = window.location.search;
    var from, to;
    if (urlParams) {
      urlParams = urlParams.split("?")[1].split("&");
      for (let i of urlParams) {
        var j = i.split("=");
        if (j[0] === "from") {
          from = j[1];
        }
        if (j[0] === "to") {
          to = j[1];
        }
      }
    }

    if (from) {
      this.selectStartPointByID(from);
      var e = document.getElementById(from);

      var transformString =
        " translate(" +
        (this.defaultViewBoxArgs[2] / 2 + this.defaultViewBoxArgs[0]) +
        "px," +
        (this.defaultViewBoxArgs[3] / 2 + this.defaultViewBoxArgs[1]) +
        "px)";
      transformString += " scale(4)";
      transformString +=
        " translate(" +
        -e.getAttribute("cx") +
        "px," +
        -e.getAttribute("cy") +
        "px)";

      document
        .getElementById("TransformMap")
        .setAttribute(
          "style",
          ";transform:" +
          transformString +
          ";" +
          "-webkit-transform:" +
          transformString +
          ";" +
          "-moz-transform:" +
          transformString +
          ";" +
          "-o-transform:" +
          transformString +
          ";"
        );
      this.setState({
        direction: "You are here, tap to select destination"
      });
    }
    if (to) {
      this.selectEndPointByID(to);
      this.transform(this.getStartPointID(), this.getEndPointID());
    }

    if (from && to) {
      this.getPath(this.getStartPointID(), this.getEndPointID());
    }
  }

  //scale svg viewbox to user viewport
  initViewBoxDimensions() {
    var verticalMargin = 0;

    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight - verticalMargin;

    var map = document.getElementById("Map");

    var viewBoxArgs = map
      .getAttribute("viewBox")
      .split(" ")
      .map(x => parseFloat(x));

    if (screenWidth < screenHeight) {
      var newHeight = viewBoxArgs[2] * (screenHeight / screenWidth);
      viewBoxArgs[1] = -(newHeight - viewBoxArgs[3]) / 2;
      viewBoxArgs[3] = newHeight;
    } else {
      var newWidth = viewBoxArgs[3] * (screenWidth / screenHeight);
      viewBoxArgs[0] = -(newWidth - viewBoxArgs[2]) / 2;
      viewBoxArgs[2] = newWidth;
    }

    map.setAttribute("viewBox", viewBoxArgs.join(" "));

    this.defaultViewBoxArgs = viewBoxArgs;
  }

  //keep track when a new finger touches screen
  onTouchDown(event) {
    this.o1 = { x: event.touches[0].pageX, y: event.touches[0].pageY };
    this.o2 = null;

    if (event.touches.length > 1) {
      this.o2 = { x: event.touches[1].pageX, y: event.touches[1].pageY };
    }
  }

  //kremove touch when user lifts finger
  onTouchUp(event) {
    if (event.touches.length > 0) {
      this.o1 = { x: event.touches[0].pageX, y: event.touches[0].pageY };
      this.o2 = null;

      if (event.touches.length > 1) {
        this.o2 = { x: event.touches[1].pageX, y: event.touches[1].pageY };
      }
    } else {
      this.o1 = null;
      this.o2 = null;
    }
  }

  //transform map on touch move
  onTouchMove(event) {
    event.preventDefault();

    var map = document.getElementById("Map");
    var scale = this.defaultViewBoxArgs[2] / map.getBoundingClientRect().width;
    let group = document.getElementById("UserTransform");
    let lastMatrix = this.getUserMatrix();
    if (event.touches.length > 1) {
      let o1 = {
        x: this.o1.x * scale + this.defaultViewBoxArgs[0],
        y: this.o1.y * scale + this.defaultViewBoxArgs[1]
      };
      let o2 = {
        x: this.o2.x * scale + this.defaultViewBoxArgs[0],
        y: this.o2.y * scale + this.defaultViewBoxArgs[1]
      };
      let r1 = {
        x: event.touches[0].pageX * scale + this.defaultViewBoxArgs[0],
        y: event.touches[0].pageY * scale + this.defaultViewBoxArgs[1]
      };
      let r2 = {
        x: event.touches[1].pageX * scale + this.defaultViewBoxArgs[0],
        y: event.touches[1].pageY * scale + this.defaultViewBoxArgs[1]
      };

      var newMatrix = this.multiplyMatrices(
        this.getDoubleTouchMatrix(o1, o2, r1, r2),
        lastMatrix
      );
      let transformString = "matrix(" + this.matrixToString(newMatrix) + ")";
      group.setAttribute(
        "style",
        "transform:" +
        transformString +
        ";" +
        "-webkit-transform:" +
        transformString +
        ";" +
        "-moz-transform:" +
        transformString +
        ";" +
        "-o-transform:" +
        transformString +
        ";"
      );

      this.o1 = { x: event.touches[0].pageX, y: event.touches[0].pageY };
      this.o2 = { x: event.touches[1].pageX, y: event.touches[1].pageY };
    } else {
      let o1 = { x: this.o1.x * scale, y: this.o1.y * scale };
      let r1 = {
        x: event.touches[0].pageX * scale,
        y: event.touches[0].pageY * scale
      };
      let newMatrix = this.multiplyMatrices(
        this.getSingleTouchMatrix(o1, r1),
        lastMatrix
      );
      let transformString = "matrix(" + this.matrixToString(newMatrix) + ")";
      group.setAttribute(
        "style",
        "transform:" +
        transformString +
        ";" +
        "-webkit-transform:" +
        transformString +
        ";" +
        "-moz-transform:" +
        transformString +
        ";" +
        "-o-transform:" +
        transformString +
        ";"
      );

      this.o1 = { x: event.touches[0].pageX, y: event.touches[0].pageY };
      this.o2 = null;
    }
    this.scaleNodes();
    this.updateCompass();
  }

  //set origin to mouse pos on pointer down
  onPointerDown(event) {
    if (!this.o1) {
      this.o1 = event;
    } else if (!this.o2) {
      this.o2 = event;
    }
  }

  //relase origin and set it to null on pointer up
  onPointerUp(event) {
    if (this.o1 && this.o1.pointerId === event.pointerId) {
      this.o1 = null;

      if (this.o2) {
        this.o1 = this.o2;
        this.o2 = null;
      }
    } else if (this.o2 && this.o2.pointerId === event.pointerId) {
      this.o2 = null;
    }
  }

  //move view box when pointer moves
  onPointerMove(event) {
    event.preventDefault();
    var map = document.getElementById("Map");
    var scale = this.defaultViewBoxArgs[2] / map.getBoundingClientRect().width;

    if (this.o2) {
      if (this.o1.pointerId === event.pointerId) {
        let group = document.getElementById("UserTransform");
        let lastMatrix = this.getUserMatrix();

        let o1 = {
          x: this.o1.pageX * scale + this.defaultViewBoxArgs[0],
          y: this.o1.pageY * scale + this.defaultViewBoxArgs[1]
        };
        let o2 = {
          x: this.o2.pageX * scale + this.defaultViewBoxArgs[0],
          y: this.o2.pageY * scale + this.defaultViewBoxArgs[1]
        };
        let r2 = {
          x: this.o2.pageX * scale + this.defaultViewBoxArgs[0],
          y: this.o2.pageY * scale + this.defaultViewBoxArgs[1]
        };
        let r1 = {
          x: event.pageX * scale + this.defaultViewBoxArgs[0],
          y: event.pageY * scale + this.defaultViewBoxArgs[1]
        };

        let newMatrix = this.multiplyMatrices(
          this.getDoubleTouchMatrix(o1, o2, r1, r2),
          lastMatrix
        );

        let transformString = "matrix(" + this.matrixToString(newMatrix) + ")";
        group.setAttribute(
          "style",
          "transform:" +
          transformString +
          ";" +
          "-webkit-transform:" +
          transformString +
          ";" +
          "-moz-transform:" +
          transformString +
          ";" +
          "-o-transform:" +
          transformString +
          ";"
        );

        this.o1 = event;
      } else if (this.o2.pointerId === event.pointerId) {
        let group = document.getElementById("UserTransform");
        let lastMatrix = this.getUserMatrix();

        let o1 = {
          x: this.o1.pageX * scale + this.defaultViewBoxArgs[0],
          y: this.o1.pageY * scale + this.defaultViewBoxArgs[1]
        };
        let o2 = {
          x: this.o2.pageX * scale + this.defaultViewBoxArgs[0],
          y: this.o2.pageY * scale + this.defaultViewBoxArgs[1]
        };
        let r1 = {
          x: this.o1.pageX * scale + this.defaultViewBoxArgs[0],
          y: this.o1.pageY * scale + this.defaultViewBoxArgs[1]
        };
        let r2 = {
          x: event.pageX * scale + this.defaultViewBoxArgs[0],
          y: event.pageY * scale + this.defaultViewBoxArgs[1]
        };

        var newMatrix = this.multiplyMatrices(
          this.getDoubleTouchMatrix(o1, o2, r1, r2),
          lastMatrix
        );
        let transformString = "matrix(" + this.matrixToString(newMatrix) + ")";
        group.setAttribute(
          "style",
          "transform:" +
          transformString +
          ";" +
          "-webkit-transform:" +
          transformString +
          ";" +
          "-moz-transform:" +
          transformString +
          ";" +
          "-o-transform:" +
          transformString +
          ";"
        );

        this.o2 = event;
      }
    } else if (this.o1 && this.o1.pointerId === event.pointerId) {
      let group = document.getElementById("UserTransform");
      let lastMatrix = this.getUserMatrix();

      let o1 = {
        x: this.o1.pageX * scale + this.defaultViewBoxArgs[0],
        y: this.o1.pageY * scale + this.defaultViewBoxArgs[1]
      };
      let r1 = {
        x: event.pageX * scale + this.defaultViewBoxArgs[0],
        y: event.pageY * scale + this.defaultViewBoxArgs[1]
      };

      let newMatrix = this.multiplyMatrices(
        this.getSingleTouchMatrix(o1, r1),
        lastMatrix
      );
      let transformString = "matrix(" + this.matrixToString(newMatrix) + ")";
      group.setAttribute(
        "style",
        "transform:" +
        transformString +
        ";" +
        "-webkit-transform:" +
        transformString +
        ";" +
        "-moz-transform:" +
        transformString +
        ";" +
        "-o-transform:" +
        transformString +
        ";"
      );

      this.o1 = event;
    }

    this.scaleNodes();
    this.updateCompass();
  }

  //zoom map onScroll event
  onScroll(event) {
    event.preventDefault();
    var map = document.getElementById("Map");
    var scale = this.defaultViewBoxArgs[2] / map.getBoundingClientRect().width;
    let group = document.getElementById("UserTransform");

    let lastMatrix = this.getUserMatrix();
    let newMatrix = this.multiplyMatrices(
      this.getTranslationMatrix(
        -event.pageX * scale - this.defaultViewBoxArgs[0],
        -event.pageY * scale - this.defaultViewBoxArgs[1]
      ),
      lastMatrix
    );
    if (
      !(this.getScale() > 20 && 1 - event.deltaY / 1000 > 1) &&
      !(this.getScale() < 0.5 && 1 - event.deltaY / 1000 < 1)
    ) {
      newMatrix = this.multiplyMatrices(
        this.getScaleMatrix(1 - event.deltaY / 1000),
        newMatrix
      );
    }
    newMatrix = this.multiplyMatrices(
      this.getTranslationMatrix(
        event.pageX * scale + this.defaultViewBoxArgs[0],
        event.pageY * scale + this.defaultViewBoxArgs[1]
      ),
      newMatrix
    );

    let transformString = "matrix(" + this.matrixToString(newMatrix) + ")";
    group.setAttribute(
      "style",
      "transform:" +
      transformString +
      ";" +
      "-webkit-transform:" +
      transformString +
      ";" +
      "-moz-transform:" +
      transformString +
      ";" +
      "-o-transform:" +
      transformString +
      ";"
    );
    // this.scaleViewBoxAtPos(Math.min(2, Math.max(1 - event.deltaY / 1000, .5)), event.pageX - document.getElementById('Map').getBoundingClientRect().left, event.pageY - document.getElementById('Map').getBoundingClientRect().top);
    this.scaleNodes();
    this.updateCompass();
  }

  //select or deselect element, fills start point first then end point. Only overrides null values
  selectElement(element) {
    var backElement;
    if (element.id.match("N[0-9]+?[A-Za-z]")) {
      backElement = element;
      element = document.getElementById(
        element.id.match("(N[0-9]+?)[A-Za-z]")[1]
      );
    } else {
      backElement = document.getElementById(element.id + "B");
    }
    var sel = this.selected.slice();
    if (this.selected[0] === element) {
      sel[0] = null;
      element.classList.remove("selected");
      backElement.classList.remove("selected");
    } else if (this.selected[1] === element) {
      sel[1] = null;
      element.classList.remove("selected");
      backElement.classList.remove("selected");
    } else if (!this.selected[0]) {
      sel[0] = element;
      element.classList.add("selected");
      backElement.classList.add("selected");
    } else if (!this.selected[1]) {
      sel[1] = element;
      element.classList.add("selected");
      backElement.classList.add("selected");
    }

    this.selected = sel;

    if (this.selected[0] && this.selected[1]) {
      this.setState({
        direction: "Press the navigate button to generate a path"
      });
    } else if (this.selected[0]) {
      this.setState({
        direction: "Tap to select destination"
      });
    } else {
      this.setState({
        direction: "Tap to select starting location"
      });
    }
  }

  getPath(startID, endID) {
    if (startID && endID) {
      this.setState({
        direction: "Navigating... please wait"
      });

      fetch(`getPath?start=${startID}&end=${endID}`)
        .then(result => result.json())
        .then(path => {
          this.transform(startID, endID);
          this.setState({
            direction: "Finished pathfinding, press Next to begin"
          });
          this.pathNodes = path.nodeIDs;
          this.pathEdges = path.edgeIDs;
          this.currNodes = 0;
          this.flush();
          console.log(path);
          this.highlightPath(path);
        });
    }

    // Rough solutin to navigate to a room number
    else if (startID) {
      let roomNumber = prompt("What room number would you like to go to?");

      fetch(`getPath?start=${startID}&toRoom=${roomNumber}`)
        .then(result => result.json())
        .then(path => {
          if(!path.ERROR) {
            this.transform(path.nodeIDs[0], path.nodeIDs[path.nodeIDs.length-1]);
            this.setState({
              direction: "Finished pathfinding, press Next to begin"
            });
            this.pathNodes = path.nodeIDs;
            this.pathEdges = path.edgeIDs;
            this.currNodes = 0;
            this.flush();
            console.log(path);
            this.highlightPath(path);
          }

          else {
            this.setState({
              direction: "Could not navigate to that room number. We may not have full support for that building yet, or " +
                "there could be no tunnels leading to that building."
            });
            this.flush();
          }
        })
    }
  }

  highlightPath(path) {
    //Highlight all the edges from the path
    path.edgeIDs.forEach(
      function(i) {
        this.highlightEdge(i);
      }.bind(this)
    );

    //Highlight all the nodes in the path
    path.nodeIDs.forEach(
      function(i) {
        this.highlightNode(i);
      }.bind(this)
    );
  }

  //override current start point with this start point call with id i.e 'N1'
  selectStartPointByID(id) {
    if (this.selected[0]) {
      document
        .getElementById(this.selected[0].id + "B")
        .classList.remove("selected");
      this.selected[0].classList.remove("selected");
    }
    var sel = this.selected.slice();
    sel[0] = document.getElementById("Map").getElementById(id);
    document.getElementById(sel[0].id + "B").classList.add("selected");
    sel[0].classList.add("selected");

    this.selected = sel;
  }

  //override current start point with this start point call with numerical id i.e '1'
  selectStartPoint(id) {
    this.selectStartPointByID("N" + id);
  }

  //override current end point with this end point call with id i.e 'N1'
  selectEndPointByID(id) {
    if (this.selected[1]) {
      document
        .getElementById(this.selected[1].id + "B")
        .classList.remove("selected");
      this.selected[1].classList.remove("selected");
    }
    var sel = this.selected.slice();
    sel[1] = document.getElementById("Map").getElementById(id);
    document.getElementById(sel[1].id + "B").classList.add("selected");
    sel[1].classList.add("selected");

    this.selected = sel;
  }

  //override current end point with this end point call with numerical id i.e '1'
  selectEndPoint(id) {
    this.selectEndPointByID("N" + id);
  }

  //highlights svg element with this id call with id i.e. 'N1' or 'E2'
  highlightByID(id) {
    document
      .getElementById("Map")
      .getElementById(id)
      .classList.add("highlight");
  }

  //highlight a specific node call with numerical id i.e. '1'
  highlightNode(id) {
    this.highlightByID("N" + id);
  }

  //highlight an array of nodes by their numerical ids
  highlightNodes(ids) {
    for (var i = 0; i < ids.length; i++) {
      this.highlightNode(ids[i]);
    }
  }

  //highlight edge based on numerical id
  highlightEdge(id) {
    this.highlightByID("E" + id);
  }

  //highlight an array of edges based on numerical ids
  highlightEdges(ids) {
    for (var i = 0; i < ids.length; i++) {
      this.highlightEdge(ids[i]);
    }
  }

  //highlight an array of nodes and edges starting and ending with a path
  highlightAll(ids) {
    for (var i = 0; i < ids.length; i++) {
      if (i % 2 === 0) {
        this.highlightEdge(ids[i]);
      } else {
        this.highlightNode(ids[i]);
      }
    }
  }

  //remove highlight on specific element
  removeHighlightByID(id) {
    document
      .getElementById("Map")
      .getElementById(id)
      .classList.remove("highlight");
  }

  //return selected start point element
  getStartPoint() {
    return this.selected[0];
  }

  //return selected end point element
  getEndPoint() {
    return this.selected[1];
  }

  //return selected array [start, end]
  getPoints() {
    return this.selected;
  }

  //return id of selected start point
  getStartPointID() {
    if (this.selected[0]) return parseInt(this.getStartPoint().id.substring(1));
    return null;
  }

  //return id of selected end point
  getEndPointID() {
    if (this.selected[1]) return parseInt(this.getEndPoint().id.substring(1));
    return null;
  }

  //return array of ids of selected points [start, end]
  getPointIDs() {
    return [this.getEndPointID(), this.getStartPointID()];
  }

  //remove highlights and selections on map
  flush() {
    Array.from(
      document.getElementById("Map").getElementsByClassName("selected")
    )
      .concat(
        Array.from(
          document.getElementById("Map").getElementsByClassName("highlight")
        )
      )
      .forEach(element => {
        element.classList.remove("selected", "highlight", "traversed");
        var sel = [null, null];

        this.selected = sel;
      });
  }

  //make user element visible
  showUser() {
    document.getElementById("User").classList.add("show");
  }

  //make user element invisible
  hideUser() {
    document.getElementById("User").classList.remove("show");
  }

  //move user to coordinates
  moveUserTo(x, y) {
    document
      .getElementById("User")
      .setAttribute("transform", "translate(" + x + "," + y + ")");
  }

  //move user to point on path, dist is percentage of path in range (0, 1)
  moveUserToPath(pathID, dist) {
    var path = document.getElementById("Map").getElementById("E" + pathID);
    var point = path.getPointAtLength(dist * path.getTotalLength());
    this.moveUserTo(point.x, point.y);
  }

  //animate user motion on specific path from point start to end at speed of speed. start and end are percentages of total length in range (0, 1)
  //stores calls in a stack to display animations one after another
  animatePath(pathID, start, end, speed) {
    var stack = this.animationStack.slice();
    stack.push(() => {
      var curr = start;
      var func = () => {
        this.moveUserToPath(pathID, curr);
        curr += start < end ? speed : -speed;
        if (start < end ? curr <= end : curr >= end) {
          requestAnimationFrame(func);
        } else {
          this.moveUserToPath(pathID, end);
          if (this.animationStack.length > 1) {
            this.animationStack = this.animationStack.slice(1);
            this.animationStack[0]();
          } else {
            this.animationStack = [];
            this.animating = false;
          }
        }
      };
      requestAnimationFrame(func);
    });

    this.animationStack = stack;

    if (!this.animating) {
      this.animationStack[0]();
      this.animating = true;
    }
  }

  //pass in object of form {nodes: [], edges:[]} where nodes is an array of nodes to be highlighted and edges is an array of edges to be highlighted and traversed.
  showPath(path) {
    this.highlightNodes(path.nodes.slice(1, -1));
    this.highlightEdges(path.edges);

    this.showUser();

    path.edges.forEach(id => {
      this.animatePath(id, 0, 1, 0.01);
    });
  }

  //transform map to show nodeIdFrom at bottom of the screen and nodeIdTo at the top
  transform(nodeIdFrom, nodeIdTo) {
    var group = document.getElementById("TransformMap");

    var currRot = group.getAttribute("style");

    if (currRot) {
      currRot = currRot.match("rotate\\((-?\\d*(:?\\.\\d*)?)deg\\)");
      if (currRot) {
        currRot = currRot[1];
      } else {
        currRot = 0;
      }
    } else {
      currRot = 0;
    }

    // var map = document.getElementById('Map')

    var n1 = document.getElementById("N" + nodeIdFrom);
    var n2 = document.getElementById("N" + nodeIdTo);

    var transformString = "";

    var inverted = this.matrixToString(
      this.matrix_invert(this.getUserMatrix())
    );
    transformString += " matrix(" + inverted + ")";

    transformString +=
      " translate(" +
      (this.defaultViewBoxArgs[2] / 2 + this.defaultViewBoxArgs[0]) +
      "px," +
      ((11 * this.defaultViewBoxArgs[3]) / 15 + this.defaultViewBoxArgs[1]) +
      "px)";

    var theta =
      Math.atan2(0, -1) +
      Math.atan2(
        n2.getAttribute("cx") - n1.getAttribute("cx"),
        n2.getAttribute("cy") - n1.getAttribute("cy")
      );
    theta = (180 * theta) / Math.PI;

    var countOfRots = Math.floor(currRot / 360);

    if (currRot < 0) {
      currRot = 360 - Math.abs(currRot % 360);
    } else {
      currRot = Math.abs(currRot % 360);
    }

    var high = Math.abs(currRot - 360 - theta);
    var mid = Math.abs(currRot - theta);
    var lower = Math.abs(currRot + 360 - theta);

    if (lower < mid) {
      if (lower < high) {
        theta += (countOfRots - 1) * 360;
      } else {
        theta += (countOfRots + 1) * 360;
      }
    } else {
      if (mid < high) {
        theta += countOfRots * 360;
      } else {
        theta += (countOfRots + 1) * 360;
      }
    }

    transformString += " rotate(" + theta + "deg)";

    var mag =
      ((n1.getAttribute("cx") - n2.getAttribute("cx")) ** 2 +
        (n1.getAttribute("cy") - n2.getAttribute("cy")) ** 2) **
      0.5;

    var scale = (this.defaultViewBoxArgs[3] * 8) / 15 / mag;

    transformString += " scale(" + scale + ")";

    //
    // var scaleString = 'scale(' + 16 / scale + ')';
    // document.getElementById('nodeRadius').innerHTML = 'circle {transform:' + scaleString + ';-webkit-transform:' + scaleString + ';-moz-transform:' + scaleString + ';-o-transform:' + scaleString + ';}';
    // document.getElementById('Map').setAttribute('stroke-width', 8 / scale + 'px')

    transformString +=
      " translate(" +
      -n1.getAttribute("cx") +
      "px," +
      -n1.getAttribute("cy") +
      "px)";

    // transformString += ' translate(' + this.defaultViewBoxArgs[0] + 'px,' +  this.defaultViewBoxArgs[1] + 'px)';

    // group.style.transform = transformString;
    group.setAttribute(
      "style",
      ";transform:" +
      transformString +
      ";" +
      "-webkit-transform:" +
      transformString +
      ";" +
      "-moz-transform:" +
      transformString +
      ";" +
      "-o-transform:" +
      transformString +
      ";"
    );

    this.scaleNodes();
    this.updateCompass();
  }

  //move map to next step in path
  nextStep() {
    if (this.pathNodes != null && this.currNodes < this.pathNodes.length - 1) {
      document
        .getElementById("N" + this.pathNodes[this.currNodes])
        .classList.add("traversed");
      if (this.currNodes > 0) {
        document
          .getElementById("E" + this.pathEdges[this.currNodes - 1])
          .classList.add("traversed");
      }
      this.transform(
        this.pathNodes[this.currNodes],
        this.pathNodes[this.currNodes + 1]
      );
      var dir = this.getDirection(this.currNodes);
      console.log(dir);

      this.currNodes = this.currNodes + 1;
      this.setState({
        direction: dir
      });
    }
  }

  //move map to previous step in path
  prevStep() {
    if (this.pathNodes != null && this.currNodes > 1) {
      document
        .getElementById("N" + this.pathNodes[this.currNodes - 1])
        .classList.remove("traversed");
      if (this.currNodes > 1) {
        document
          .getElementById("E" + this.pathEdges[this.currNodes - 2])
          .classList.remove("traversed");
      }
      this.transform(
        this.pathNodes[this.currNodes - 2],
        this.pathNodes[this.currNodes - 1]
      );
      var dir = this.getDirection(this.currNodes - 2);
      console.log(dir);
      this.currNodes = this.currNodes - 1;
      this.setState({
        direction: dir
      });
    }
  }

  //returns directions for user based on node passed in.
  getDirection(currNodes) {
    var ret = "Your destination is ahead";
    if (this.pathNodes && currNodes < this.pathNodes.length - 2) {
      var n1 = document.getElementById("N" + this.pathNodes[currNodes]);
      var n2 = document.getElementById("N" + this.pathNodes[currNodes + 1]);
      var n3 = document.getElementById("N" + this.pathNodes[currNodes + 2]);

      var theta1 = Math.atan2(
        n2.getAttribute("cx") - n1.getAttribute("cx"),
        n2.getAttribute("cy") - n1.getAttribute("cy")
      );
      var theta2 = Math.atan2(
        n3.getAttribute("cx") - n2.getAttribute("cx"),
        n3.getAttribute("cy") - n2.getAttribute("cy")
      );

      ret = "";

      var theta = theta1 - theta2;
      if (theta > Math.PI) {
        theta -= 2 * Math.PI;
      } else if (theta < -Math.PI) {
        theta += 2 * Math.PI;
      }

      if (theta > Math.PI / 8) {
        ret += "take a ";
        if (theta > Math.PI / 4) {
          ret += "right ";
        } else {
          ret += "slight right ";
        }
      } else if (theta < -Math.PI / 8) {
        ret += "take a ";
        if (theta < -Math.PI / 4) {
          ret += "left ";
        } else {
          ret += "slight left ";
        }
      } else {
        ret += "continue straight ";
      }

      ret += "at the next ";

      if (n2.classList.contains("intersection")) {
        ret += "intersection";
      } else if (n2.classList.contains("staircase")) {
        ret += "staircase";
      } else if (n2.classList.contains("exit")) {
        ret += "exit";
      } else if (n2.classList.contains("elevator")) {
        ret += "elevator";
      }
    }
    return ret;
  }

  //adds markers along path pointing along the desired direction
  markers(edgeId, markers, startNodeId, endNodeId) {
    var scale = document.getElementById("TransformMap").getAttribute("style");
    if (scale) {
      scale = scale.match("scale\\((-?\\d*(:?\\.\\d*)?)\\)")[1];
    } else {
      scale = 1;
    }

    var lineLength = 16 / scale;

    var path = document.getElementById(edgeId);

    var pathStart = document.getElementById(startNodeId);
    var pathEnd = document.getElementById(endNodeId);

    var dy = pathEnd.getAttribute("cy") - pathStart.getAttribute("cy");
    var dx = pathEnd.getAttribute("cx") - pathStart.getAttribute("cx");

    var mag = Math.sqrt(dx ** 2 + dy ** 2);

    dx /= mag;
    dy /= mag;

    for (var i = 1; i <= markers; i++) {
      var arrow = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "polygon"
      );

      var point1 = path.getPointAtLength(
        (i * path.getTotalLength()) / (markers + 1)
      );
      point1.x += (dx * lineLength) / 2;
      point1.y += (dy * lineLength) / 2;

      var point2 = {
        x: point1.x - dx * lineLength - (dy * lineLength) / 2,
        y: point1.y - dy * lineLength + (dx * lineLength) / 2
      };
      var point3 = {
        x: point1.x - dx * lineLength + (dy * lineLength) / 2,
        y: point1.y - dy * lineLength - (dx * lineLength) / 2
      };

      arrow.setAttribute(
        "points",
        point1.x +
        "," +
        point1.y +
        " " +
        point2.x +
        "," +
        point2.y +
        " " +
        point3.x +
        "," +
        point3.y
      );

      path.parentElement.insertBefore(arrow, path.nextSibling);
    }
  }

  //multiply two 3x3 matrices
  multiplyMatrices(m1, m2) {
    return [
      [
        m1[0][0] * m2[0][0] + m1[0][1] * m2[1][0] + m1[0][2] * m2[2][0],
        m1[0][0] * m2[0][1] + m1[0][1] * m2[1][1] + m1[0][2] * m2[2][1],
        m1[0][0] * m2[0][2] + m1[0][1] * m2[1][2] + m1[0][2] * m2[2][2]
      ],
      [
        m1[1][0] * m2[0][0] + m1[1][1] * m2[1][0] + m1[1][2] * m2[2][0],
        m1[1][0] * m2[0][1] + m1[1][1] * m2[1][1] + m1[1][2] * m2[2][1],
        m1[1][0] * m2[0][2] + m1[1][1] * m2[1][2] + m1[1][2] * m2[2][2]
      ],
      [0, 0, 1]
    ];
  }

  //return identity matrix
  getIdentityMatrix() {
    return [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  }

  //get rotation matrix of rad degrees in radians
  getRotationMatrix(rad) {
    return [
      [Math.cos(rad), Math.sin(rad), 0],
      [-Math.sin(rad), Math.cos(rad), 0],
      [0, 0, 1]
    ];
  }

  //get transformation matrix for a x translation tx and y translation ty
  getTranslationMatrix(tx, ty) {
    return [[1, 0, tx], [0, 1, ty], [0, 0, 1]];
  }

  //get transformation matrix for a uniform scale of s
  getScaleMatrix(s) {
    return [[s, 0, 0], [0, s, 0], [0, 0, 1]];
  }

  //convert matrix to string to be used in css transform
  matrixToString(m) {
    return (
      m[0][0] +
      "," +
      m[1][0] +
      "," +
      m[0][1] +
      "," +
      m[1][1] +
      "," +
      m[0][2] +
      "," +
      m[1][2]
    );
  }

  //convert string to matrix, string in form 'a,b,c,d,tx,ty' goes to [[a,c,tx],[b,d,ty],[0,0,1]]
  stringToMatrix(s) {
    var m = s.split(",");
    return [[m[0], m[2], m[4]], [m[1], m[3], m[5]], [0, 0, 1]];
  }

  //get current matrix transforming the svg
  getUserMatrix() {
    var result = document.getElementById("UserTransform").getAttribute("style");
    if (result) {
      result = result.match("matrix\\((.+?)\\)");
      if (result) {
        return this.stringToMatrix(result[1]);
      } else {
        return this.getIdentityMatrix();
      }
    } else {
      return this.getIdentityMatrix();
    }
  }

  getSingleTouchMatrix(o, r) {
    return this.getTranslationMatrix(r.x - o.x, r.y - o.y);
  }

  //get 3x3 transformation matrix matching the the transformations of o1->r1 and o2->r2
  getDoubleTouchMatrix(o1, o2, r1, r2) {
    var o = { x: (o1.x + o2.x) / 2, y: (o1.y + o2.y) / 2 };
    var r = { x: (r1.x + r2.x) / 2, y: (r1.y + r2.y) / 2 };

    var od = Math.sqrt((o2.x - o1.x) ** 2 + (o2.y - o1.y) ** 2);
    var rd = Math.sqrt((r2.x - r1.x) ** 2 + (r2.y - r1.y) ** 2);

    var originTranslation = this.getTranslationMatrix(-o.x, -o.y);
    var rotationTranslation = this.getRotationMatrix(
      Math.atan2(r2.x - r1.x, r2.y - r1.y) -
      Math.atan2(o2.x - o1.x, o2.y - o1.y)
    );
    var scaleMatrix = this.getScaleMatrix(rd / od);
    var newTranslation = this.getTranslationMatrix(r.x, r.y);

    var result = this.getIdentityMatrix();

    result = this.multiplyMatrices(originTranslation, result);
    result = this.multiplyMatrices(rotationTranslation, result);
    if (
      !(this.getScale() > 20 && rd / od > 1) &&
      !(this.getScale() < 0.5 && rd / od < 1)
    ) {
      result = this.multiplyMatrices(scaleMatrix, result);
    }
    result = this.multiplyMatrices(newTranslation, result);

    return result;
  }

  matrix_invert(M) {
    var det = M[0][0] * M[1][1] - M[0][1] * M[1][0];

    return [
      [
        M[1][1] / det,
        -M[0][1] / det,
        -(M[1][1] * M[0][2] - M[0][1] * M[1][2]) / det
      ],
      [
        -M[1][0] / det,
        M[0][0] / det,
        (M[1][0] * M[0][2] - M[0][0] * M[1][2]) / det
      ],
      [0, 0, 1]
    ];
  }

  //get current matrix transforming map
  getMapMatrix() {
    var style = document.getElementById("TransformMap").getAttribute("style");
    if (style) {
      style = style.match(
        "matrix\\((.+?)\\) translate\\((.+?)px,(.+?)px\\) rotate\\((.+?)deg\\) scale\\((.+?)\\) translate\\((.+?)px,(.+?)px\\)"
      );
      if (style) {
        var matrix = this.stringToMatrix(style[1]);
        matrix = this.multiplyMatrices(
          matrix,
          this.getTranslationMatrix(style[2], style[3])
        );
        matrix = this.multiplyMatrices(
          matrix,
          this.getRotationMatrix((-style[4] * Math.PI) / 180)
        );
        matrix = this.multiplyMatrices(matrix, this.getScaleMatrix(style[5]));
        matrix = this.multiplyMatrices(
          matrix,
          this.getTranslationMatrix(style[6], style[7])
        );

        return matrix;
      } else {
        return this.getIdentityMatrix();
      }
    } else {
      return this.getIdentityMatrix();
    }
  }

  //show nodes of class c
  showNodes(c) {
    var s = document.getElementById("ShowNodes");
    var r = new RegExp("\\" + c + ".+?{.+?}", "g");
    s.innerHTML = s.innerHTML.replace(r, "");
    // if (s.innerHTML.match(r)) {
    //   s.innerHTML = s.innerHTML.replace(r, c + ':not(highlight){visibility:visible;}');
    // } else {
    //   s.innerHTML = c + ':not(highlight){visibility:visible;}' + s.innerHTML;
    // }
  }

  //hide nodes of class c
  hideNodes(c) {
    var s = document.getElementById("ShowNodes");
    var r = new RegExp("\\" + c + ".+?{.+?}", "g");

    if (s.innerHTML.match(r)) {
      s.innerHTML = s.innerHTML.replace(
        r,
        c + ":not(.highlight):not(.selected){visibility:hidden;}"
      );
    } else {
      s.innerHTML =
        c + ":not(.highlight):not(.selected){visibility:hidden;}" + s.innerHTML;
    }
  }

  getSearchGroup(b, r) {
    var building = document.querySelectorAll("circle" + b + ":not(.backNode)");
    var ret = [];

    for (let i of building) {
      // console.log
      if (i.getAttribute("class").match(r)) ret.push(i.id.substring(1));
    }

    console.log(ret);
  }
}

export default Map;
