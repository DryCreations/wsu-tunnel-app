const mysql = require("mysql");
const util = require("util");
const { tabletop, aws, local } = require("./config.js");

const config = process.argv.slice(2)[0];

const pool = mysql.createPool(eval(config));
const query = util.promisify(pool.query).bind(pool);

exports.allEdges = async function() {
  return query("SELECT connectionID, nodeA_ID, nodeB_ID FROM connections");
};

exports.node = async function(nodeID) {
  return query("SELECT * FROM nodes WHERE nodeID = ?", nodeID);
};

exports.getNodesToRoom = async function(roomNumber, useStairs = true) {
  // Get all regexes and their corresponding node IDs
  let nodes = await query(
    "SELECT nodeID, roomRegEx, nodeTypeID FROM nodes WHERE nodeTypeID>=" +
      (useStairs === "true" ? "2" : "3")
  );

  //Create an array to hold the nodeIDs with regexs that match the room number
  let connectedNodeIDs = [];

  //Check over all of the nodes to see if their regex matches the room number
  nodes.forEach(i => {
    let regex = new RegExp(i.roomRegEx);
    if (regex.test(roomNumber)) {
      //If it does, add it to the array
      connectedNodeIDs.push(i.nodeID);
    }
  });

  return connectedNodeIDs;
};

exports.adjacentNodes = async function(nodeID) {
  let sql =
    "SELECT connectionID, length, nodeA_ID AS nextNodeID " +
    "FROM connections " +
    "WHERE nodeB_ID=? " +
    "UNION " +
    "SELECT connectionID, length, nodeB_ID AS nextNodeID " +
    "FROM connections " +
    "WHERE nodeA_ID=?";
  return query(sql, [nodeID, nodeID]);
};
