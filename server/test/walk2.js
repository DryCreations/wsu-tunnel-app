const assert = require('assert').strict;
const fetch = require("node-fetch")
const database = require('../src/database.js');

describe('getPath(start, end)', async function()
{
    let edges = await database.allEdges();

    edges.forEach(function(edge)
    {
        assertPath(edge.connectionID, edge.nodeA_ID, edge.nodeB_ID);
        assertPath(edge.connectionID, edge.nodeB_ID, edge.nodeA_ID);
    });

    run();
});

function assertPath(edge, nodeA, nodeB)
{
    let title = 'node '+nodeA+' to node'+nodeB+' through edge '+edge;

    it(title, async function()
    {
        let url = 'http://localhost:5000/getPath/'+nodeA+'-'+nodeB;
        let expectedNodes = [nodeA, nodeB];
        let expectedEdge = [edge];

        let result = await fetch(url);
        let path = await result.json();

        assert.deepStrictEqual(path.nodeIDs, expectedNodes);
        assert.deepStrictEqual(path.edgeIDs, expectedEdge);
    });
}
