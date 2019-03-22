import React, { Component } from 'react';
import './Map.css';
import {ReactComponent as MapSVG} from '../Maps/map.svg';
//import Graph from '../../nav/Graph.js';
//import PathFinder from '../../nav/PathFinder.js';

class Map extends Component {
    constructor(props) {
        super(props);

        var sel = [null, null];

        this.state = {
            selected: sel,
            o1: null,
            o2: null,
            t: null,
            lAvgX: null,
            lAvgY: null,
            lAvgD: null,
            animationStack: [],
            animating: false,
            pathNodes: null,
            currNodes: 0,
            defaultViewBoxArgs: '0 0 640 480',
        };

        //bind touch events to this object
        this.onPointerDown = this.onPointerDown.bind(this);
        this.onPointerUp = this.onPointerUp.bind(this);
        this.onPointerMove = this.onPointerMove.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.onTouchDown = this.onTouchDown.bind(this);
        this.onTouchUp = this.onTouchUp.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);

        window.mapComponent = this; //call functions by window.mapComponent.{Function call here}

        //Create a Graph object to be used by path finding
        //this.graph = new Graph(5, 6);

        //Create a path finder reading that Graph
        //this.pathFinder = new PathFinder(this.graph);
    }

    //render map to screen
    render() {
        return (
            <div id='MapContainer'>
            <MapSVG />
            <button
            id="NavigateButton"
            onClick={() => this.getPath(this.getStartPointID(), this.getEndPointID())}>
            Navigate
            </button>

            <button
            id="PreviousViewButton"
            onClick={() => this.prevStep()}>
            Previous
            </button>

            <button
            id="NextViewButton"
            onClick={() => this.nextStep()}>
            Next
            </button>

            </div>
        );
    }

    //set onclick for svg elements, called after load
    componentDidMount() {
        Array.from(document.getElementById('Map').getElementsByTagName('circle')).forEach((element) => {
            if (element.id !== 'User') {
                element.onclick = () => {
                    this.selectElement(element);
                };
            }
        });

        var map = document.getElementById('Map');

        //bind scroll to zoom function
        map.addEventListener('wheel', this.onScroll);

        //bind events to corresponding functions
        if (window.PointerEvent) {
            map.addEventListener('pointerdown', this.onPointerDown);
            map.addEventListener('pointerup', this.onPointerUp);
            map.addEventListener('pointerleave', this.onPointerUp);
            map.addEventListener('pointermove', this.onPointerMove);

        } else {
            map.addEventListener('mousedown', this.onPointerDown);
            map.addEventListener('mouseup', this.onPointerUp);
            map.addEventListener('mouseleave', this.onPointerUp);
            map.addEventListener('mousemove', this.onPointerMove);

            map.addEventListener('touchstart', this.onTouchDown);
            map.addEventListener('touchend', this.onTouchUp);
            map.addEventListener('touchmove', this.onTouchMove);
        }

        this.initViewBoxDimensions();
    }

    initViewBoxDimensions() {
      var verticalMargin = 0;

      var screenWidth = window.innerWidth;
      var screenHeight = window.innerHeight - verticalMargin;

      var map = document.getElementById('Map');

      var viewBoxArgs = map.getAttribute('viewBox').split(' ').map(x => parseFloat(x));

      if (screenWidth  < screenHeight) {
        var newHeight = viewBoxArgs[2] * (screenHeight / screenWidth);
        viewBoxArgs[1] = -(newHeight - viewBoxArgs[3]) / 2;
        viewBoxArgs[3] = newHeight;
      } else {
        var newWidth = viewBoxArgs[3] * (screenWidth / screenHeight);
        viewBoxArgs[0] = -(newWidth - viewBoxArgs[2]) / 2;
        viewBoxArgs[2] = newWidth;
      }

      map.setAttribute('viewBox', viewBoxArgs.join(' '));

      this.setState({
        defaultViewBoxArgs: viewBoxArgs,
      });
    }

    onTouchDown(event) {
        var avgX = 0;
        var avgY = 0;

        for(let i = 0; i < event.touches.length; i++) {
            avgX += event.touches[i].pageX;
            avgY += event.touches[i].pageY;
        }

        avgX /= event.touches.length;
        avgY /= event.touches.length;

        if (event.touches.length > 1) {
            var avgD = 0;

            for(let i = 0; i < event.touches.length; i++) {
                avgD += Math.hypot(event.touches[i].pageX - avgX, event.touches[i].pageY - avgY);
            }
            avgD /= event.touches.length;

        }


        this.setState({
            t: event,
            lAvgX: avgX,
            lAvgY: avgY,
            lAvgD: avgD,
        });
    }

    onTouchUp(event) {
        var avgX = 0;
        var avgY = 0;

        for(let i = 0; i < event.touches.length; i++) {
            avgX += event.touches[i].pageX;
            avgY += event.touches[i].pageY;
        }

        avgX /= event.touches.length;
        avgY /= event.touches.length;

        if (event.touches.length > 1) {
            var avgD = 0;

            for(let i = 0; i < event.touches.length; i++) {
                avgD += Math.hypot(event.touches[i].pageX - avgX, event.touches[i].pageY - avgY);
            }
            avgD /= event.touches.length;

        }


        this.setState({
            t: event,
            lAvgX: avgX,
            lAvgY: avgY,
            lAvgD: avgD,
        });
    }

    onTouchMove(event) {
        event.preventDefault();
        var avgX = 0;
        var avgY = 0;

        for(let i = 0; i < event.touches.length; i++) {
            avgX += event.touches[i].pageX;
            avgY += event.touches[i].pageY;
        }

        avgX /= event.touches.length;
        avgY /= event.touches.length;

        if (event.touches.length > 1) {
            var avgD = 0;

            for(let i = 0; i < event.touches.length; i++) {
                avgD += Math.hypot(event.touches[i].pageX - avgX, event.touches[i].pageY - avgY);
            }
            avgD /= event.touches.length;

            this.scaleViewBoxAtPos(Math.min(2, Math.max(1 - (this.state.lAvgD - avgD) / 100, .5)), avgX, avgY);
        }
        let map = document.getElementById('Map');
        let rec = map.getBoundingClientRect();
        let viewBoxArgs = map.getAttribute('viewBox').split(' ').map(x => parseFloat(x));
        let scalarX = viewBoxArgs[2] / rec.width;
        let scalarY = viewBoxArgs[3] / rec.height;

        this.shiftViewBox(scalarX * (this.state.lAvgX - avgX), scalarY * (this.state.lAvgY - avgY));

        this.setState({
            t: event,
            lAvgX: avgX,
            lAvgY: avgY,
            lAvgD: avgD,
        });


    }

    //set origin to mouse pos on pointer down
    onPointerDown(event) {

        if (!this.state.o1) {
            this.setState({
                o1: event,
            });
        } else if (!this.state.o2) {
            this.setState({
                o2: event,
            });
        }
    }

    //relase origin and set it to null on pointer up
    onPointerUp(event) {
        if (this.state.o1 && this.state.o1.pointerId === event.pointerId) {
            this.setState({
                o1: null,
            });
            if (this.state.o2) {
                this.setState({
                    o1: this.state.o2,
                    o2: null,
                });
            }
        } else if (this.state.o2 && this.state.o2.pointerId === event.pointerId) {
            this.setState({
                o2: null,
            });
        }
    }

    //move view box when pointer moves
    onPointerMove(event) {
        event.preventDefault();
        var map = document.getElementById('Map');

        if (this.state.o2) {
            if (this.state.o1.pointerId === event.pointerId) {
                let rec = map.getBoundingClientRect();
                let delta = Math.hypot(this.state.o2.pageX - this.state.o1.pageX, this.state.o2.pageY - this.state.o1.pageY) - Math.hypot(this.state.o2.pageX - event.pageX, this.state.o2.pageY - event.pageY);
                this.scaleViewBoxAtPos(Math.min(2, Math.max(1 - delta / 200, .5)),
                    (event.pageX + this.state.o2.pageX) / 2 - rec.left,
                    (event.pageY + this.state.o2.pageY) / 2 - rec.top);

                let viewBoxArgs = map.getAttribute('viewBox').split(' ').map(x => parseFloat(x));
                let scalarX = viewBoxArgs[2] / rec.width;
                let scalarY = viewBoxArgs[3] / rec.height;

                this.shiftViewBox(((this.state.o1.pageX + this.state.o2.pageX) / 2 - (event.pageX + this.state.o2.pageX) / 2) * scalarX, ((this.state.o1.pageY + this.state.o2.pageY) / 2 - (event.pageY + this.state.o2.pageY) / 2) * scalarY);

                this.setState({
                    o1: event,
                });
            } else if (this.state.o2.pointerId === event.pointerId) {
                let rec = map.getBoundingClientRect();
                let delta = Math.hypot(this.state.o2.pageX - this.state.o1.pageX, this.state.o2.pageY - this.state.o1.pageY) - Math.hypot(this.state.o1.pageX - event.pageX, this.state.o1.pageY - event.pageY);
                this.scaleViewBoxAtPos(Math.min(2, Math.max(1 - delta / 200, .5)),
                    (event.pageX + this.state.o1.pageX) / 2 - rec.left,
                    (event.pageY + this.state.o1.pageY) / 2 - rec.top);

                let viewBoxArgs = map.getAttribute('viewBox').split(' ').map(x => parseFloat(x));
                let scalarX = viewBoxArgs[2] / rec.width;
                let scalarY = viewBoxArgs[3] / rec.height;

                this.shiftViewBox(((this.state.o1.pageX + this.state.o2.pageX) / 2 - (event.pageX + this.state.o1.pageX) / 2) * scalarX, ((this.state.o1.pageY + this.state.o2.pageY) / 2 - (event.pageY + this.state.o1.pageY) / 2) * scalarY);

                this.setState({
                    o2: event,
                });
            }
        } else if (this.state.o1 && this.state.o1.pointerId === event.pointerId) {
            let rec = map.getBoundingClientRect();
            let viewBoxArgs = map.getAttribute('viewBox').split(' ').map(x => parseFloat(x));
            let scalarX = viewBoxArgs[2] / rec.width;
            let scalarY = viewBoxArgs[3] / rec.height;

            this.shiftViewBox((this.state.o1.pageX - event.pageX) * scalarX, (this.state.o1.pageY - event.pageY) * scalarY);
            this.setState({
                o1: event,
            });
        }
    }

    //scale using scroll event. TODO: add mult touch support for scaling
    onScroll(event) {
        event.preventDefault();
        this.scaleViewBoxAtPos(Math.min(2, Math.max(1 - event.deltaY / 1000, .5)), event.pageX - document.getElementById('Map').getBoundingClientRect().left, event.pageY - document.getElementById('Map').getBoundingClientRect().top);
    }

    scaleViewBox(scale) {
        var map = document.getElementById('Map');

        var viewBoxArgs = map.getAttribute('viewBox').split(' ').map(x => parseFloat(x));

        var shiftX = (viewBoxArgs[2] * (1 - 1 / scale)) / 2;
        var shiftY = (viewBoxArgs[3] * (1 - 1 / scale)) / 2;

        viewBoxArgs[2] *= 1 / scale;
        viewBoxArgs[3] *= 1 / scale;

        map.setAttribute('viewBox', viewBoxArgs.join(' '));

        var scale2 = map.getElementById('TransformMap').getAttribute('style');

        if (scale2) {
          scale2 = scale2.match('scale\\((-?\\d*(:?\\.\\d*)?)\\)');
          if (scale2) {
            scale2 = scale2[1];

          } else {
            scale2 = 1
          }
        } else {
          scale2 = 1;
        }

        map.setAttribute('stroke-width', Math.min((5 / (this.state.defaultViewBoxArgs[3] / viewBoxArgs[3])) / scale2, 5));
        map.getElementById('TransformMap').style.r = Math.min((8 / (this.state.defaultViewBoxArgs[3] / viewBoxArgs[3])) / scale2, 8);

        this.shiftViewBox(shiftX, shiftY);
    }

    scaleViewBoxAtPos(scale, x, y) {
        var map = document.getElementById('Map');
        let rec = map.getBoundingClientRect();

        var viewBoxArgs = map.getAttribute('viewBox').split(' ').map(x => parseFloat(x));

        var shiftX = (viewBoxArgs[2] * (1 - 1 / scale)) * (x / rec.width);
        var shiftY = (viewBoxArgs[3] * (1 - 1 / scale)) * (y / rec.height);

        viewBoxArgs[2] *= 1 / scale;
        viewBoxArgs[3] *= 1 / scale;

        map.setAttribute('viewBox', viewBoxArgs.join(' '));

        var scale2 = map.getElementById('TransformMap').getAttribute('style');

        if (scale2) {
          scale2 = scale2.match('scale\\((-?\\d*(:?\\.\\d*)?)\\)');
          if (scale2) {
            scale2 = scale2[1];
          } else {
            scale2 = 1
          }
        } else {
          scale2 = 1;
        }

        map.setAttribute('stroke-width', Math.min((5 / (this.state.defaultViewBoxArgs[3] / viewBoxArgs[3])) / scale2, 5));
        map.getElementById('TransformMap').style.r = Math.min((8 / (this.state.defaultViewBoxArgs[3] / viewBoxArgs[3])) / scale2, 8);

        this.shiftViewBox(shiftX, shiftY);
    }

    shiftViewBox(x, y) {
        var map = document.getElementById('Map');

        var viewBoxArgs = map.getAttribute('viewBox').split(' ').map(x => parseFloat(x));

        viewBoxArgs[0] += x;
        viewBoxArgs[1] += y;

        map.setAttribute('viewBox', viewBoxArgs.join(' '));
    }

    //select or deselect element, fills start point first then end point. Only overrides null values
    selectElement(element) {
        var sel = this.state.selected.slice();
        if (this.state.selected[0] === element) {
            sel[0] = null;
            element.classList.remove('selected')
        } else if (this.state.selected[1] === element) {
            sel[1] = null;
            element.classList.remove('selected')
        } else if (!this.state.selected[0]) {
            sel[0] = element;
            element.classList.add('selected')
        } else if (!this.state.selected[1]) {
            sel[1] = element;
            element.classList.add('selected')
        }
        this.setState({
            selected: sel,
        });
    }

    getPath(startID, endID) {
        //Clear all highlights
        this.flush();

        //this.highlightPath(this.pathFinder.getPath(startID, endID));

        fetch('getPath/'+startID+'-'+endID)
            .then(result => result.json())
            .then(path => {
              this.setState({
                pathNodes: path.nodeIDs,
                currNodes: 0,
              });
              this.highlightPath(path);
            });
    }

    highlightPath(path) {
        //Highlight all the edges from the path
        path.edgeIDs.forEach(function (i) {
            this.highlightEdge(i);
        }.bind(this));

        //Highlight all the nodes in the path
        path.nodeIDs.forEach(function (i) {
            this.highlightNode(i);
        }.bind(this));
    }

    //override current start point with this start point call with id i.e 'N1'
    selectStartPointByID(id) {
        if (this.state.selected[0]) {
            this.state.selected[0].classList.remove('selected');
        }
        var sel = this.state.selected.slice();
        sel[0] = document.getElementById('Map').getElementById(id);
        sel[0].classList.add('selected');

        this.setState({
            selected: sel,
        });
    }

    //override current start point with this start point call with numerical id i.e '1'
    selectStartPoint(id) {
        this.selectStartPointByID('N' + id);
    }

    //override current end point with this end point call with id i.e 'N1'
    selectEndPointByID(id) {
        if (this.state.selected[1]) {
            this.state.selected[1].classList.remove('selected');
        }
        var sel = this.state.selected.slice();
        sel[1] = document.getElementById('Map').getElementById(id);
        sel[1].classList.add('selected');

        this.setState({
            selected: sel,
        });
    }

    //override current end point with this end point call with numerical id i.e '1'
    selectEndPoint(id) {
        this.selectEndPointByID('N' + id);
    }

    //highlights svg element with this id call with id i.e. 'N1' or 'E2'
    highlightByID(id) {
        document.getElementById('Map').getElementById(id).classList.add('highlight');
    }

    //highlight a specific node call with numerical id i.e. '1'
    highlightNode(id) {
        this.highlightByID('N' + id);
    }

    //highlight an array of nodes by their numerical ids
    highlightNodes(ids) {
        for(var i = 0; i < ids.length; i++) {
            this.highlightNode(ids[i]);
        }
    }

    //highlight edge based on numerical id
    highlightEdge(id) {
        this.highlightByID('E' + id);
    }

    //highlight an array of edges based on numerical ids
    highlightEdges(ids) {
        for(var i = 0; i < ids.length; i++) {
            this.highlightEdge(ids[i]);
        }
    }

    //highlight an array of nodes and edges starting and ending with a path
    highlightAll(ids) {
        for(var i = 0; i < ids.length; i++) {
            if (i % 2 === 0) {
                this.highlightEdge(ids[i]);
            } else {
                this.highlightNode(ids[i]);
            }
        }
    }

    //remove highlight on specific element
    removeHighlightByID(id) {
        document.getElementById('Map').getElementById(id).classList.remove('highlight');
    }

    //return selected start point element
    getStartPoint() {
        return this.state.selected[0];
    }

    //return selected end point element
    getEndPoint() {
        return this.state.selected[1];
    }

    //return selected array [start, end]
    getPoints() {
        return this.state.selected;
    }

    //return id of selected start point
    getStartPointID() {
        if (this.state.selected[0])
            return parseInt(this.getStartPoint().id.substring(1));
        return null;
    }

    //return id of selected end point
    getEndPointID() {
        if (this.state.selected[1])
            return parseInt(this.getEndPoint().id.substring(1));
        return null;
    }

    //return array of ids of selected points [start, end]
    getPointIDs() {
        return [this.getEndPointID(), this.getStartPointID()];
    }

    //remove highlights and selections on map
    flush() {
        Array.from(document.getElementById('Map').getElementsByClassName('selected')).concat(Array.from(document.getElementById('Map').getElementsByClassName('highlight'))).forEach((element) => {
            element.classList.remove('selected', 'highlight');
            var sel = [null, null];

            this.setState({
                selected: sel,
            });
        });
    }

    //make user element visible
    showUser() {
        document.getElementById('User').classList.add('show');
    }

    //make user element invisible
    hideUser() {
        document.getElementById('User').classList.remove('show');
    }

    //move user to coordinates
    moveUserTo(x, y) {
        document.getElementById('User').setAttribute('transform','translate('+ x  + ',' + y + ')');
    }

    //move user to point on path, dist is percentage of path in range (0, 1)
    moveUserToPath(pathID, dist) {
        var path = document.getElementById('Map').getElementById('E' + pathID);
        var point = path.getPointAtLength(dist * path.getTotalLength());
        this.moveUserTo(point.x, point.y);
    }

    //animate user motion on specific path from point start to end at speed of speed. start and end are percentages of total length in range (0, 1)
    //stores calls in a stack to display animations one after another
    animatePath(pathID, start, end, speed) {
        var stack = this.state.animationStack.slice();
        stack.push(() => {
            var curr = start;
            var func = () => {
                this.moveUserToPath(pathID, curr)
                curr += start < end ? speed : -speed;
                if (start < end ? curr <= end : curr >= end) {
                    requestAnimationFrame(func);
                } else {
                    this.moveUserToPath(pathID, end);
                    if (this.state.animationStack.length > 1) {
                        this.setState({
                            animationStack: this.state.animationStack.slice(1),
                        });
                        this.state.animationStack[0]()
                    } else {
                        this.setState({
                            animationStack: [],
                            animating: false,
                        });
                    }
                }
            }
            requestAnimationFrame(func);
        });

        this.setState({
            animationStack: stack,
        });

        if (!this.state.animating) {
            this.state.animationStack[0]();
            this.setState({
                animating: true,
            });
        }
    }

    //pass in object of form {nodes: [], edges:[]} where nodes is an array of nodes to be highlighted and edges is an array of edges to be highlighted and traversed.
    showPath(path) {
        this.highlightNodes(path.nodes.slice(1,-1));
        this.highlightEdges(path.edges);

        this.showUser();

        path.edges.forEach((id) => {
            this.animatePath(id, 0, 1, 0.01);
        });
    }

    resetViewBox() {
      var map = document.getElementById('Map')

      var viewBoxArgs = this.state.defaultViewBoxArgs.slice(0);

      viewBoxArgs[0] = 0;
      viewBoxArgs[1] = 0;

      map.setAttribute('viewBox', viewBoxArgs.join(' '));
    }

    transform(nodeIdFrom, nodeIdTo) {
      this.resetViewBox();

      var group = document.getElementById('TransformMap');


      var currRot = group.getAttribute('transform')

      if (currRot) {
        currRot = currRot.match('rotate\\((-?\\d*(:?\\.\\d*)?)\\)')[1];
      } else {
        currRot = 0;
      }

      var map = document.getElementById('Map')

      var n1 = document.getElementById('N' + nodeIdFrom);
      var n2 = document.getElementById('N' + nodeIdTo);

      var transformString = '';

      transformString += 'translate(' + this.state.defaultViewBoxArgs[2] / 2 + 'px,' + 11 * this.state.defaultViewBoxArgs[3] / 15 + 'px)';

      var theta = Math.atan2(0, -1) + Math.atan2(n2.getAttribute('cx') - n1.getAttribute('cx'), n2.getAttribute('cy') - n1.getAttribute('cy'));
      theta = 180 * theta / Math.PI

      var countOfRots = Math.floor(currRot / 360);
      var currRot;
      if (currRot < 0) {
        currRot = 360 - Math.abs(currRot % 360);
      } else {
        currRot = Math.abs(currRot % 360);
      }

      var high = Math.abs((currRot - 360) - theta);
      var mid = Math.abs((currRot) - theta);
      var lower = Math.abs((currRot + 360) - theta);

      if (lower < mid) {
        if (lower < high) {
          theta += (countOfRots - 1) * 360
        } else {
          theta += (countOfRots + 1) * 360
        }
      } else {
        if (mid < high) {
          theta += countOfRots * 360
        } else {
          theta += (countOfRots + 1) * 360
        }
      }

      transformString += ' rotate(' + theta + 'deg)';

      var mag = ((n1.getAttribute('cx') - n2.getAttribute('cx')) ** 2 + (n1.getAttribute('cy') - n2.getAttribute('cy')) ** 2) ** .5;

      var scale = (this.state.defaultViewBoxArgs[3] * 8 / 15) / mag;

      transformString += ' scale(' + scale + ')';
      transformString += ' translate(' + -n1.getAttribute('cx') + 'px,' + -n1.getAttribute('cy') + 'px)';

      map.setAttribute('stroke-width', 5 / scale )

      // group.style.transform = transformString;
      group.setAttribute('style', 'r:' + 8 / scale + ';transform:' + transformString + ';' +
                                  '-webkit-transform:' + transformString + ';' +
                                  '-moz-transform:' + transformString + ';' +
                                  '-o-transform:' + transformString + ';');
    }

    nextStep() {

      if (this.state.pathNodes != null && this.state.currNodes < this.state.pathNodes.length - 1) {
        this.transform(this.state.pathNodes[this.state.currNodes], this.state.pathNodes[this.state.currNodes + 1])
        console.log(this.getDirection(this.state.currNodes));
        this.setState({
          currNodes: this.state.currNodes + 1,
        });
      }
    }

    prevStep() {
      if (this.state.pathNodes != null && this.state.currNodes > 1) {
        this.transform(this.state.pathNodes[this.state.currNodes - 2], this.state.pathNodes[this.state.currNodes - 1])
        this.setState({
          currNodes: this.state.currNodes - 1,
        });
      }
    }

    getDirection(currNodes) {
      var ret = 'Your destination is ahead'
      if (this.state.pathNodes && currNodes < this.state.pathNodes.length - 2) {
        var n1 = document.getElementById('N' + this.state.pathNodes[currNodes]);
        var n2 = document.getElementById('N' + this.state.pathNodes[currNodes + 1]);
        var n3 = document.getElementById('N' + this.state.pathNodes[currNodes + 2]);

        var theta1 = Math.atan2(n2.getAttribute('cx') - n1.getAttribute('cx'), n2.getAttribute('cy') - n1.getAttribute('cy'));
        var theta2 = Math.atan2(n3.getAttribute('cx') - n2.getAttribute('cx'), n3.getAttribute('cy') - n2.getAttribute('cy'));

        ret = '';

        var theta = theta1 - theta2;
        if (theta > Math.PI) {
          theta -= 2 * Math.PI;
        } else if (theta < -Math.PI) {
          theta += 2 * Math.PI;
        }

        if (theta > Math.PI / 8) {
          ret += 'take a '
          if (theta > Math.PI / 4) {
            ret += 'right ';
          } else {
            ret += 'slight right '
          }
        } else if (theta < -Math.PI / 8) {
          ret += 'take a '
          if (theta < -Math.PI / 4) {
            ret += 'left ';
          } else {
            ret += 'slight left '
          }
        } else {
          ret += 'continue straight ';
        }

        ret += 'at the next ';

        if (n2.classList.contains('intersection')) {
          ret += 'intersection';
        } else if (n2.classList.contains('staircase')) {
          ret += 'staircase';
        } else if (n2.classList.contains('exit')) {
          ret += 'exit';
        } else if (n2.classList.contains('elevator')) {
          ret += 'elevator';
        }
      }
      return ret;
    }


    markers(edgeId, markers, startNodeId, endNodeId) {
      var scale = document.getElementById('TransformMap').getAttribute('style');
      if (scale) {
        scale = scale.match('scale\\((-?\\d*(:?\\.\\d*)?)\\)')[1];
      } else {
        scale = 1;
      }

      var lineLength = 16 / scale;

      var path = document.getElementById(edgeId);

      var pathStart = document.getElementById(startNodeId);
      var pathEnd = document.getElementById(endNodeId);

      var dy = pathEnd.getAttribute('cy') - pathStart.getAttribute('cy');
      var dx = pathEnd.getAttribute('cx') - pathStart.getAttribute('cx');

      var mag = Math.sqrt(dx ** 2 + dy ** 2);

      dx /= mag;
      dy /= mag;

      for(var i = 1; i <= markers; i++) {
        var arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');


        var point1 = path.getPointAtLength(i * path.getTotalLength() / (markers + 1));
        point1.x += dx * lineLength / 2;
        point1.y += dy * lineLength / 2;

        var point2 = {x: point1.x - dx * lineLength - dy * lineLength / 2, y: point1.y - dy * lineLength + dx * lineLength / 2};
        var point3 = {x: point1.x - dx * lineLength + dy * lineLength / 2, y: point1.y - dy * lineLength - dx * lineLength / 2};

        arrow.setAttribute('points', point1.x + ',' + point1.y + ' ' + point2.x + ',' + point2.y + ' ' + point3.x + ',' + point3.y);

        path.parentElement.insertBefore(arrow, path.nextSibling);
      }
    }

}


export default Map;
