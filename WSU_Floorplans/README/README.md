# Data Acquisition and Storage

## Summary
The objective of data acquisition is to collect the minimum amount of data required to navigate a user from anywhere in [Wright State University's](https://www.wright.edu/) tunnel system to any other location in the tunnels, or the nearest staircase/elevator to take them out of the tunnels. This data shall be stored in a [MySQL](https://www.mysql.com/) database in such a format that the web app is capable of extracting relevant data to determine the fastest path from a user's current estimated location to their desired destination. This database is stored on an [Amazon Web Services](https://aws.amazon.com/) server. "Data" is defined as the collection of nodes and the connections between them. These nodes and connections are similar to nodes and edges as described by [graph theory](https://en.wikipedia.org/wiki/Graph_theory).

### Nodes
Nodes are singular datapoints that represent a geographical location in the tunnel system. Each node has the following properties:

* **nodeID** : *integer*
  * A unique identifier for each node.
* **lat** : *double*
  * The latitude of the node in accordance with the Mercator projection.
* **long** : *double*
  * The longitude of the node in accordance with the Mercator projection.
* **elev** : *integer* **(UNUSED)**
  * The elevation from sea level of the node. Value should be 0.
* **isIndoors** : *boolean* **(UNUSED)**
  * Whether or not the node is indoors or outdoors. Value should be T.
* **buildingID** : *integer*
  * A number unique to each building denoting what building the node is in. A table of all building IDs can be found below.
* **floor** : *integer* **(UNUSED)**
  * A number denoting what floor of a building the node is on
* **roomNumber** : *string* **(UNUSED)**
  * This will likely end up being used to link each intersection node to the nearest rooms. Doing this will allow a user to search a specific room in a specific building and the app should navigate them as close as it possibly can without storing each individual room as a separate node.
* **nodeTypeID** : *integer*
  * What type of datapoint the node is. A table of all nodeTypeIDs can be found below. Nodes will always be one of the types listed in the table.

#### Building IDs
| buildingID | Building Name |
|:----------:|:-------------:|
|0           |No Building|
|1           |Allyn Hall|
|2           |Biological Sciences I|
|3           |Biological Sciences II|
|4           |Creative Arts Center|
|5           |Diggs Laboratory|
|6           |Dunbar Library|
|7           |Fawcett Hall|
|8           |Joshi Center|
|9           |Library Annex|
|10          |Math & Microbiology|
|11          |Medical Sciences|
|12          |Milett Hall|
|13          |Motion Pictures|
|14          |Oelman Hall|
|15          |Rike Hall|
|16          |Russ Engineering|
|17          |Student Success Center|
|18          |Student Union|
|19          |University Hall|
\*Note: Hamilton Hall, Health Sciences, Neuroscience Building, and White Hall have been deliberately excluded from this list as they are not connected to the rest of campus through the tunnels.

#### Node Type IDs
|nodeTypeID| Type |
|:--------:|:----:|
|0         |Intersection|
|1         |Exit|
|2         |Staircase|
|3         |Elevator|

### Connections
Connections are pathways that connect two adjacent nodes. Connections are used to denote where a user can and cannot walk, as well as storing distances between nodes, which are used to calculate the shortest distance between any two nodes. Each connection has the following properties:

* **connectionID** : *integer*
  * A unique identifier for each connection.\
* **nodeA_ID** : *integer*
  * The nodeID of the first node in the connection.
* **nodeB_ID** : *integer*
  * The nodeID of the second node in the connection.
* **length** : *integer*
  * The distance between node A and node B. Note this distance is the distance a user would have to travel through the tunnel system to reach node B from node A, and that this distance is not necessarily calculated from the length of a linear line connecting node A and node B.
* **isIndoors** : *boolean* **(UNUSED)**
  * Whether or not the connection is indoors or outdoors. Value should be T.
* **hasStairs** : *boolean* **(UNUSED)**
  * Whether or not the connection has a staircase along its path.
* **hasElevator** : *boolean* **(UNUSED)**
  * Whether or not the connection has an elevator along its path.

## Collecting Data
First, a source map must be either created or collected. [David Kendrick](https://people.wright.edu/david.kendrick) generously gave us this image to use:

![Map of the tunnel system](WSU_Campus_Tunnel_Map.pdf)
