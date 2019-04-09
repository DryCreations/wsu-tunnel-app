const database = require("./database.js");
const coordinate = require("./coordinate.js");
const DEBUG = 0;

/**
 * Uses A* to find a path from one node to another or from one node to the
 * nearest of an array of nodes.
 * @param {number} startID - The ID of the node to start at
 * @param {number|Array} endIDs - The ID(s) of the node(s) to end at
 * @return {Object} An object containing data representing the shortest path
 *  between two points
 */
exports.getPath = async function(startID, endIDs) {
  //Make sure that endIDs is an array
  if (!Array.isArray(endIDs)) endIDs = [endIDs];

  //Retrieve the information about all of the ending nodes
  let endNodes = new Map();

  //Load in the data for all of the possible end IDs
  for (let i of endIDs) {
    let nodeData = await database.node(i);
    endNodes.set(i, nodeData);

    if (DEBUG >= 5) {
      console.log("Set end node " + i + " to: ");
      console.log(nodeData);
    }
  }

  //Create a stack to hold the ID's frontier nodes.  this should be kept sorted at all times
  let toVisit = [{ id: startID, heuristic: 0 }];

  //Stores the distance to each of the nodes visited. Unvisited nodes will have a distance of -1
  let distances = new Map();
  distances.set(startID, 0);

  //Stores the node preceding any given node in the path
  let previousNodes = new Map();
  previousNodes.set(startID, { nodeID: startID, edgeID: undefined });

  //Begin A* pathfinding
  while (toVisit.length > 0) {
    //Get the ID of the next node to be visited
    var thisNodeID = toVisit.pop().id;
    if (DEBUG >= 3) console.log("Popped node " + thisNodeID);

    //Check to see if an end node has been reached
    if (endIDs.includes(thisNodeID)) {
      if (DEBUG >= 2)
        console.log(
          "End node has been reached. The distance is " +
            distances.get(thisNodeID)
        );

      //Print that the end has been reached
      var firstEndID = thisNodeID;
      break;
    }

    //Get the nodes adjacent to this node
    let edges = await database.adjacentNodes(thisNodeID);

    for (let edge of edges) {
      let currentPath = distances.get(thisNodeID) + edge.length;

      let previousPath = distances.get(edge.nextNodeID);

      //Check to see if either the next node hasn't been visited or the path to the node
      //via the current path is shorter than the previous one
      if (!previousPath || currentPath < previousPath) {
        //Store the total distance to that node
        distances.set(edge.nextNodeID, currentPath);

        //Store that the previous node along the path to otherNode
        previousNodes.set(edge.nextNodeID, {
          nodeID: thisNodeID,
          edgeID: edge.connectionID
        });

        let otherNode = await database.node(edge.nextNodeID);

        //Check to see if the node is an intersection or an exit, so the
        //  algorithm doen't plot through stair                                                                    V-- this is a temporary fix. It is bad.
        if (
          endIDs.includes(otherNode[0].nodeID) ||
          otherNode[0].nodeTypeID === 0 ||
          otherNode[0].nodeTypeID === 1 ||
          thisNodeID === 1 ||
          thisNodeID === 2 ||
          thisNodeID === 3
        ) {
          //Get the minimum distance from otherNode to the end node
          let crowFlightToEnd = Math.min(
            ...endIDs.map(i =>
              coordinate.distanceTo(otherNode[0], endNodes.get(i)[0])
            )
          );

          //Get the A* heuristic distance for this node
          let heuristic = currentPath + crowFlightToEnd;

          //Get the index where this node should be spliced in
          let insertIndex = toVisit.length;
          while (
            insertIndex !== 0 &&
            heuristic > toVisit[insertIndex - 1].heuristic
          )
            insertIndex--;

          //And splice it in
          toVisit.splice(insertIndex, 0, {
            id: edge.nextNodeID,
            heuristic: heuristic
          });

          if (DEBUG >= 3)
            console.log(
              "Inserted node " + edge.nextNodeID + " at index " + insertIndex
            );
        }
      }
    }
  }

  //Get the path taken..

  //Object to store path data
  let path = { nodeIDs: [firstEndID], edgeIDs: [] };

  //Iterate backwards through the path, storing it into the path object arrays
  //Note that the resulting arrays will be backwards from the actual direction of the path...
  while (path.nodeIDs[path.nodeIDs.length - 1] !== startID) {
    //Get the ID of this node
    var thisID = path.nodeIDs[path.nodeIDs.length - 1];
    //Get the previous node in the path
    let previous = previousNodes.get(thisID);

    //Push the edge and the node IDs into the path
    path.nodeIDs.push(previous.nodeID);
    path.edgeIDs.push(previous.edgeID);
  }

  //Since the arrays were loaded backwards, reverse them now
  path.nodeIDs = path.nodeIDs.reverse();
  path.edgeIDs = path.edgeIDs.reverse();

  return path;
};

if (DEBUG >= 1) {
  let asyncTest = async function() {
    //Check to see that all nodes have valid connections
    if (DEBUG >= 11) {
      for (var i = 1; i < 138; i++) {
        console.log("------------------------------------");
        console.log("Nodes connected to " + i);
        console.log("------------------------------------");

        let hasSomethingBesidesAStairOrElevator = false;

        let edges = await database.adjacentNodes(i);
        for (let edge of edges) {
          let nodeData = await database.node(edge.nextNodeID);
          console.log(nodeData);
          if (nodeData[0].nodeTypeID === 0 || nodeData[0].nodeTypeID === 1)
            hasSomethingBesidesAStairOrElevator = true;
        }

        if (!hasSomethingBesidesAStairOrElevator) {
          console.log(
            "\x1b[31;1mThis node does not have any routable connections!\x1b[0m"
          );
        }
      }
    }

    console.log("Testing some dummy paths...");
    console.log(await exports.getPath(1, [6, 5, 13]));
    console.log(await exports.getPath(1, [6, 5]));
    console.log(await exports.getPath(14, [67, 52, 128]));
  };

  asyncTest();
}
