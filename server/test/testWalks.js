const assert = require("assert").strict;
const fetch = require("node-fetch");
const walks = require("./walks.js");

const walksToTest = [walks.len1, walks.len2, walks.len3];

walksToTest.forEach(function(test) {
  describe(`walks of length ${test[0].edgeIDs.length}`, function() {
    test.forEach(function(walk) {
      assertPath(walk.nodeIDs, walk.edgeIDs);
    });
  });
});

function assertPath(nodes, edges) {
  let start = nodes[0];
  let end = nodes[nodes.length - 1];

  let title = `node ${start} to node ${end}`;

  it(title, async function() {
    let url = `http://localhost:5000/getPath?start=${start}&end=${end}`;

    let result = await fetch(url);
    let path = await result.json();

    assert.deepStrictEqual(path.nodeIDs, nodes);
  });
}
