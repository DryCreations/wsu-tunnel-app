const mysql = require("mysql");
const util = require("util");
const { tabletop, aws } = require("./config.js");

const config = process.argv.slice(2)[0] === "aws" ? aws : tabletop;

const pool = mysql.createPool(config);
const query = util.promisify(pool.query).bind(pool);

exports.allEdges = async function() {
  return query("SELECT connectionID, nodeA_ID, nodeB_ID FROM connections");
};

exports.node = async function(nodeID) {
  return query("SELECT * FROM nodes WHERE nodeID = ?", nodeID);
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
