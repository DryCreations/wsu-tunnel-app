import React, { Component } from 'react';
import './Map.css';
import {ReactComponent as MapSVG} from '../Maps/map.svg';

class Map extends Component {
    constructor(props) {
        super(props);

        var sel = [null, null];

        this.state = {
            selected: sel,
            o1: null,
            o2: null,
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

        window.addEventListener("resize", this.initViewBoxDimensions.bind(this));

        window.mapComponent = this; //call functions by window.mapComponent.{Function call here}
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

        var sheet = document.createElement('style')
        sheet.innerHTML = "circle {transform: scale(8);-webkit-transform:scale(8);-moz-transform:scale(8);-o-transform:scale(8);}";
        document.head.appendChild(sheet);
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
      this.setState({
        o1: {x:event.touches[0].pageX, y:event.touches[0].pageY},
        o2: null,
      });
      if (event.touches.length > 1) {
        this.setState({
          o2: {x:event.touches[1].pageX, y:event.touches[1].pageY},
        });
      }
    }

    onTouchUp(event) {
      if (event.touches.length > 0) {
        this.setState({
          o1: {x:event.touches[0].pageX, y:event.touches[0].pageY},
          o2: null,
        });
        if (event.touches.length > 1) {
          this.setState({
            o2: {x:event.touches[1].pageX, y:event.touches[1].pageY},
          });
        }
      } else {
        this.setState({
          o1: null,
          o2: null,
        });
      }
    }

    onTouchMove(event) {
        event.preventDefault();

        var map = document.getElementById('Map');
        var scale = this.state.defaultViewBoxArgs[2] / map.getBoundingClientRect().width;
        let group = document.getElementById('UserTransform');
        let lastMatrix = this.getUserMatrix();
        if (event.touches.length > 1) {
          let o1 = {x: this.state.o1.x * scale + this.state.defaultViewBoxArgs[0], y: this.state.o1.y * scale + this.state.defaultViewBoxArgs[1]};
          let o2 = {x: this.state.o2.x * scale + this.state.defaultViewBoxArgs[0], y: this.state.o2.y * scale + this.state.defaultViewBoxArgs[1]};
          let r1 = {x: event.touches[0].pageX * scale + this.state.defaultViewBoxArgs[0], y: event.touches[0].pageY * scale + this.state.defaultViewBoxArgs[1]};
          let r2 = {x: event.touches[1].pageX * scale + this.state.defaultViewBoxArgs[0], y: event.touches[1].pageY * scale + this.state.defaultViewBoxArgs[1]};

          var newMatrix = this.multiplyMatrices(this.getDoubleTouchMatrix(o1, o2, r1, r2), lastMatrix);
          let transformString = 'matrix(' + this.matrixToString(newMatrix) + ')';
          group.setAttribute('style', 'transform:' + transformString + ';' +
                                      '-webkit-transform:' + transformString + ';' +
                                      '-moz-transform:' + transformString + ';' +
                                      '-o-transform:' + transformString + ';')
          this.setState({
              o1: {x:event.touches[0].pageX, y:event.touches[0].pageY},
              o2: {x:event.touches[1].pageX, y:event.touches[1].pageY},
          });
        } else {
          let o1 = {x: this.state.o1.x * scale, y: this.state.o1.y * scale};
          let r1 = {x: event.touches[0].pageX * scale, y: event.touches[0].pageY * scale};
          let newMatrix = this.multiplyMatrices(this.getSingleTouchMatrix(o1, r1), lastMatrix);
          let transformString = 'matrix(' + this.matrixToString(newMatrix) + ')';
          group.setAttribute('style', 'transform:' + transformString + ';' +
                                      '-webkit-transform:' + transformString + ';' +
                                      '-moz-transform:' + transformString + ';' +
                                      '-o-transform:' + transformString + ';')
          this.setState({
            o1: {x:event.touches[0].pageX, y:event.touches[0].pageY},
            o2: null,
          });
        }

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
        var scale = this.state.defaultViewBoxArgs[2] / map.getBoundingClientRect().width;

        if (this.state.o2) {
            if (this.state.o1.pointerId === event.pointerId) {
              let group = document.getElementById('UserTransform');
              let lastMatrix = this.getUserMatrix();

              let o1 = {x: this.state.o1.pageX * scale + this.state.defaultViewBoxArgs[0], y: this.state.o1.pageY * scale + this.state.defaultViewBoxArgs[1]};
              let o2 = {x: this.state.o2.pageX * scale + this.state.defaultViewBoxArgs[0], y: this.state.o2.pageY * scale + this.state.defaultViewBoxArgs[1]};
              let r2 = {x: this.state.o2.pageX * scale + this.state.defaultViewBoxArgs[0], y: this.state.o2.pageY * scale + this.state.defaultViewBoxArgs[1]};
              let r1 = {x: event.pageX * scale + this.state.defaultViewBoxArgs[0], y: event.pageY * scale + this.state.defaultViewBoxArgs[1]};

              let newMatrix = this.multiplyMatrices(this.getDoubleTouchMatrix(o1, o2, r1, r2), lastMatrix);

              let transformString = 'matrix(' + this.matrixToString(newMatrix) + ')';
              group.setAttribute('style', 'transform:' + transformString + ';' +
                                          '-webkit-transform:' + transformString + ';' +
                                          '-moz-transform:' + transformString + ';' +
                                          '-o-transform:' + transformString + ';')

              this.setState({
                  o1: event,
              });
            } else if (this.state.o2.pointerId === event.pointerId) {
              let group = document.getElementById('UserTransform');
              let lastMatrix = this.getUserMatrix();

              let o1 = {x: this.state.o1.pageX * scale + this.state.defaultViewBoxArgs[0], y: this.state.o1.pageY * scale + this.state.defaultViewBoxArgs[1]};
              let o2 = {x: this.state.o2.pageX * scale + this.state.defaultViewBoxArgs[0], y: this.state.o2.pageY * scale + this.state.defaultViewBoxArgs[1]};
              let r1 = {x: this.state.o1.pageX * scale + this.state.defaultViewBoxArgs[0], y: this.state.o1.pageY * scale + this.state.defaultViewBoxArgs[1]};
              let r2 = {x: event.pageX * scale + this.state.defaultViewBoxArgs[0], y: event.pageY * scale + this.state.defaultViewBoxArgs[1]};

              var newMatrix = this.multiplyMatrices(this.getDoubleTouchMatrix(o1, o2, r1, r2), lastMatrix);
              let transformString = 'matrix(' + this.matrixToString(newMatrix) + ')';
              group.setAttribute('style', 'transform:' + transformString + ';' +
                                          '-webkit-transform:' + transformString + ';' +
                                          '-moz-transform:' + transformString + ';' +
                                          '-o-transform:' + transformString + ';')
              this.setState({
                  o2: event,
              });
            }
        } else if (this.state.o1 && this.state.o1.pointerId === event.pointerId) {
          let group = document.getElementById('UserTransform');
          let lastMatrix = this.getUserMatrix();

          let o1 = {x: this.state.o1.pageX * scale + this.state.defaultViewBoxArgs[0], y: this.state.o1.pageY * scale + this.state.defaultViewBoxArgs[1]};
          let r1 = {x: event.pageX * scale + this.state.defaultViewBoxArgs[0], y: event.pageY * scale + this.state.defaultViewBoxArgs[1]};


          let newMatrix = this.multiplyMatrices(this.getSingleTouchMatrix(o1, r1), lastMatrix);
          let transformString = 'matrix(' + this.matrixToString(newMatrix) + ')';
          group.setAttribute('style', 'transform:' + transformString + ';' +
                                      '-webkit-transform:' + transformString + ';' +
                                      '-moz-transform:' + transformString + ';' +
                                      '-o-transform:' + transformString + ';')
          this.setState({
              o1: event,
          });
        }
    }

    onScroll(event) {
      event.preventDefault();
      var map = document.getElementById('Map');
      var scale = this.state.defaultViewBoxArgs[2] / map.getBoundingClientRect().width;
      let group = document.getElementById('UserTransform');

      let lastMatrix = this.getUserMatrix();
      let newMatrix = this.multiplyMatrices(this.getTranslationMatrix(-event.pageX * scale - this.state.defaultViewBoxArgs[0], -event.pageY * scale - this.state.defaultViewBoxArgs[1]), lastMatrix);
      newMatrix = this.multiplyMatrices(this.getScaleMatrix(1 - event.deltaY/1000), newMatrix);
      newMatrix = this.multiplyMatrices(this.getTranslationMatrix(event.pageX * scale + this.state.defaultViewBoxArgs[0], event.pageY * scale + this.state.defaultViewBoxArgs[1]), newMatrix);

      let transformString = 'matrix(' + this.matrixToString(newMatrix) + ')';
      group.setAttribute('style', 'transform:' + transformString + ';' +
                                  '-webkit-transform:' + transformString + ';' +
                                  '-moz-transform:' + transformString + ';' +
                                  '-o-transform:' + transformString + ';')
      // this.scaleViewBoxAtPos(Math.min(2, Math.max(1 - event.deltaY / 1000, .5)), event.pageX - document.getElementById('Map').getBoundingClientRect().left, event.pageY - document.getElementById('Map').getBoundingClientRect().top);
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

        fetch(`getPath?start=${startID}&end=${endID}`)
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


    transform(nodeIdFrom, nodeIdTo) {

      var group = document.getElementById('TransformMap');


      var currRot = group.getAttribute('style')

      if (currRot) {
        currRot = currRot.match('rotate\\((-?\\d*(:?\\.\\d*)?)deg\\)');
        if (currRot) {
          currRot = currRot[1];
        } else {
          currRot = 0;
        }
      } else {
        currRot = 0;
      }

      var map = document.getElementById('Map')

      var n1 = document.getElementById('N' + nodeIdFrom);
      var n2 = document.getElementById('N' + nodeIdTo);

      var transformString = '';

      var inverted = this.matrixToString(this.matrix_invert(this.getUserMatrix()));
      transformString += ' matrix(' + inverted + ')';

      transformString += ' translate(' + (this.state.defaultViewBoxArgs[2] / 2 + this.state.defaultViewBoxArgs[0]) + 'px,' + (11 * this.state.defaultViewBoxArgs[3] / 15 + this.state.defaultViewBoxArgs[1]) + 'px)';

      var theta = Math.atan2(0, -1) + Math.atan2(n2.getAttribute('cx') - n1.getAttribute('cx'), n2.getAttribute('cy') - n1.getAttribute('cy'));
      theta = 180 * theta / Math.PI

      var countOfRots = Math.floor(currRot / 360);

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

      // transformString += ' translate(' + this.state.defaultViewBoxArgs[0] + 'px,' +  this.state.defaultViewBoxArgs[1] + 'px)';

      // group.style.transform = transformString;
      group.setAttribute('style', ';transform:' + transformString + ';' +
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

    multiplyMatrices(m1, m2) {
      var result = [];
      for (var i = 0; i < m1.length; i++) {
          result[i] = [];
          for (var j = 0; j < m2[0].length; j++) {
              var sum = 0;
              for (var k = 0; k < m1[0].length; k++) {
                  sum += m1[i][k] * m2[k][j];
              }
              result[i][j] = sum;
          }
      }
      return result;
    }

    getIdentityMatrix() {
      return [[1,0,0],
              [0,1,0],
              [0,0,1]];
    }

    getRotationMatrix(rad) {
      return [[Math.cos(rad),Math.sin(rad),0],
              [-Math.sin(rad),Math.cos(rad),0],
              [0,0,1]];
    }

    getTranslationMatrix(tx, ty) {
      return [[1,0,tx],
              [0,1,ty],
              [0,0,1]];
    }

    getScaleMatrix(s) {
      return [[s,0,0],
              [0,s,0],
              [0,0,1]];
    }

    matrixToString(m) {
      return m[0][0] + ',' + m[1][0] + ',' + m[0][1] + ',' + m[1][1] + ',' + m[0][2] + ',' + m[1][2];
    }

    stringToMatrix(s) {
      var m = s.split(',');
      return [[m[0],m[2],m[4]],
              [m[1],m[3],m[5]],
              [0,0,1]]
    }

    getUserMatrix() {
      var result = document.getElementById('UserTransform').getAttribute('style');
      if (result) {
        result = result.match('matrix\\((.+?)\\)');
        if (result) {
          return this.stringToMatrix(result[1]);
        } else {
          return this.getIdentityMatrix();
        }
      } else {
        return(this.getIdentityMatrix());
      }
    }

    getSingleTouchMatrix(o, r) {
      return this.getTranslationMatrix(r.x - o.x, r.y - o.y);
    }

    getDoubleTouchMatrix(o1, o2, r1, r2) {
      var o = {x: (o1.x + o2.x) / 2, y: (o1.y + o2.y) / 2};
      var r = {x: (r1.x + r2.x) / 2, y: (r1.y + r2.y) / 2};

      var od = Math.sqrt((o2.x - o1.x) ** 2 + (o2.y - o1.y) ** 2);
      var rd = Math.sqrt((r2.x - r1.x) ** 2 + (r2.y - r1.y) ** 2);

      var originTranslation = this.getTranslationMatrix(-o.x, -o.y);
      var rotationTranslation = this.getRotationMatrix(Math.atan2(r2.x - r1.x, r2.y - r1.y) - Math.atan2(o2.x - o1.x, o2.y - o1.y));
      var scaleMatrix = this.getScaleMatrix(rd / od);
      var newTranslation = this.getTranslationMatrix(r.x, r.y);

      var result = this.getIdentityMatrix();

      result = this.multiplyMatrices(originTranslation, result);
      result = this.multiplyMatrices(rotationTranslation, result);
      result = this.multiplyMatrices(scaleMatrix, result);
      result = this.multiplyMatrices(newTranslation, result);

      return result;
    }

    //from http://blog.acipo.com/matrix-inversion-in-javascript/
    matrix_invert(M){
      // I use Guassian Elimination to calculate the inverse:
      // (1) 'augment' the matrix (left) by the identity (on the right)
      // (2) Turn the matrix on the left into the identity by elemetry row ops
      // (3) The matrix on the right is the inverse (was the identity matrix)
      // There are 3 elemtary row ops: (I combine b and c in my code)
      // (a) Swap 2 rows
      // (b) Multiply a row by a scalar
      // (c) Add 2 rows

      //if the matrix isn't square: exit (error)
      if(M.length !== M[0].length){return;}

      //create the identity matrix (I), and a copy (C) of the original
      var i=0, ii=0, j=0, dim=M.length, e=0, t=0;
      var I = [], C = [];
      for(i=0; i<dim; i+=1){
          // Create the row
          I[I.length]=[];
          C[C.length]=[];
          for(j=0; j<dim; j+=1){

              //if we're on the diagonal, put a 1 (for identity)
              if(i==j){ I[i][j] = 1; }
              else{ I[i][j] = 0; }

              // Also, make the copy of the original
              C[i][j] = M[i][j];
          }
      }

      // Perform elementary row operations
      for(i=0; i<dim; i+=1){
          // get the element e on the diagonal
          e = C[i][i];

          // if we have a 0 on the diagonal (we'll need to swap with a lower row)
          if(e==0){
              //look through every row below the i'th row
              for(ii=i+1; ii<dim; ii+=1){
                  //if the ii'th row has a non-0 in the i'th col
                  if(C[ii][i] != 0){
                      //it would make the diagonal have a non-0 so swap it
                      for(j=0; j<dim; j++){
                          e = C[i][j];       //temp store i'th row
                          C[i][j] = C[ii][j];//replace i'th row by ii'th
                          C[ii][j] = e;      //repace ii'th by temp
                          e = I[i][j];       //temp store i'th row
                          I[i][j] = I[ii][j];//replace i'th row by ii'th
                          I[ii][j] = e;      //repace ii'th by temp
                      }
                      //don't bother checking other rows since we've swapped
                      break;
                  }
              }
              //get the new diagonal
              e = C[i][i];
              //if it's still 0, not invertable (error)
              if(e==0){return}
          }

          // Scale this row down by e (so we have a 1 on the diagonal)
          for(j=0; j<dim; j++){
              C[i][j] = C[i][j]/e; //apply to original matrix
              I[i][j] = I[i][j]/e; //apply to identity
          }

          // Subtract this row (scaled appropriately for each row) from ALL of
          // the other rows so that there will be 0's in this column in the
          // rows above and below this one
          for(ii=0; ii<dim; ii++){
              // Only apply to other rows (we want a 1 on the diagonal)
              if(ii==i){continue;}

              // We want to change this element to 0
              e = C[ii][i];

              // Subtract (the row above(or below) scaled by e) from (the
              // current row) but start at the i'th column and assume all the
              // stuff left of diagonal is 0 (which it should be if we made this
              // algorithm correctly)
              for(j=0; j<dim; j++){
                  C[ii][j] -= e*C[i][j]; //apply to original matrix
                  I[ii][j] -= e*I[i][j]; //apply to identity
              }
          }
      }

      //we've done all operations, C should be the identity
      //matrix I should be the inverse:
      return I;
    }
}


export default Map;
