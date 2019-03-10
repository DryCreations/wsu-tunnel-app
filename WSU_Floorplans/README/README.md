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

### Source Map
First, a source map must be either created or collected. [David Kendrick](https://people.wright.edu/david.kendrick) generously gave us this image to use:

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/WSU_Campus_Tunnel_Map.png "Map of the tunnel system")

### Image Preparation
This step is not necessary, however it can prove to be quite useful if there are a lot of nodes you wish to map. Marking locations of nodes and numbering them with their corresponding nodeID can help with future steps. [Photoshop](https://www.adobe.com/products/photoshop.html) is capable of doing this, however any image editing tool will do, as how you complete this step is up to you. [Gimp](https://www.gimp.org/) is a good free option. This is the above image prepared for rasterization:

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/WSU_Campus_Tunnel_Map_Nodes_Drawn.png "Image with nodes marked and labeled")

### Image Rasterization

To use this image to collect actual data, it must be mapped to a coordinate system. [Google Maps](https://www.google.com/maps/place/Wright+State+University/@39.7846157,-84.0605168,17z/data=!3m1!4b1!4m5!3m4!1s0x88409cf05f334387:0x4a08e9031987088!8m2!3d39.7846157!4d-84.0583281) is a great place to get accurate coordinate data, but the tunnels are not visible from the surface of the Earth. To get coordinates of nodes in the tunnels, we must create a rastered image scaled to the [Mercator Projection](https://en.wikipedia.org/wiki/Mercator_projection). To do this, we will grab the coordinates of some known points from Google Maps. Easy points to grab are corners of buildings, as they are visible on Google Maps and our image. On Google Maps, click a corner of a building and record the latitude and longitude in a temporary document. Make sure to collect at least five points, one in each corner of the area you wish to map and one roughly in the middle.

Next, we will create the rastered image. [QGIS](https://www.qgis.org/en/site/) is a great tool for doing this, and it is available for Windows, MacOS, Linux, BSD, and Android at this [download link](https://www.qgis.org/en/site/forusers/download.html).

Once QGIS is installed, launch QGIS Desktop. You should be greeted by a window that looks similar to this:

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/QGIS_Desktop_Homepage.png "QGIS Desktop Homepage")

[This tutorial](https://www.qgistutorials.com/en/docs/georeferencing_basics.html) will walk you through how to use QGIS as we will, but for the sake of this project this tutorial has been modified for this document as it applies to this project.

#### Enabling the Georeferencer GDAL Plugin
We will use the Geforeferencer GDAL plugin to raster the image. This plugin is built into stock QGIS, so all you have to do is enable it. Go to Plugins > Manage and Install Plugins. In the pop-up window, scroll until you find "Georeferencer GDAL" and click the check box next to it. Then, close the window.

#### Using the Georeferencer Tool
Click Raster > Georeferencer > Georeferencer. The Georeferencer window should open:

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/Georeferencer_Homepage.png "Georeferencer Homepage")

To open your map, go to File > Open raster. In the file explorer that pops up, find and double-click your source map. You will then be prompted to select a [Coordinate Reference System (CRS)](https://en.wikipedia.org/wiki/Spatial_reference_system). We will use `WGS 84 / Pseudo Mercator`. Copy-paste that into the Filter text box, then select it and click OK. Two options may come up. We used the CRS with Authority ID EPSG:3857, though there shouldn't be a noticeable difference. You should now have a window that looks like this:

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/Georeferencer_Preraster.png "Georeferencer Homepage")

Next, you will add the points you collected from Google Maps as known accurate points. Click the "Add point" button:

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/Georeferencer_Add_Point_Button.png "Add Point Button")

Click on one of the same points you clicked on Google Maps. Enter the latitude/longitude from that point you saved from earlier. Note that latitude is North/South or Y. This means that the order of the latitude/longitude coordinates you wrote down may need to be switched in order to comply with Georeferencer's X/Y coordinate system. Repeat this process with all the points you collected earlier. You should then have a window that looks like this, with five points on the GCP table:

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/Georeferencer_Reference_Points_Added.png "Reference Points added to GCP table")

Then, click the Transformation Settings button:

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/Transformation_Settings_Button.png "Transformation Settings Button")

Change the options to match those in the following screenshot, then click OK. You can save your output raster to whatever image you would like, but saving it as a .tif is necessary.

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/Georeferencer_Transformation_Settings.png "Transformation Settings")

To start the rasterization process, click File > Start georeferencing. This may take a few seconds depending on how powerful your CPU is. Once the process completes, you can close the Georeferencer window and return to the QGIS Desktop window, which should now have your rastered image loaded:

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/QGIS_Desktop_With_Rastered_Image.png "QGIS Desktop with Rastered Image")

The rastered image should be diagonal with a slight curve to it, mimicking the curve of the Earth. If the image is oddly warped, just restart the georeferencing process from the "Using the Georeferencer Tool" header in this document. Georeferencer can be a little finicky at times, and it's quite easy to mess up a coordinate. Sometimes restarting can fix the issue.

#### Coordinate Interpolation
You likely won't have the Coordinate Capture section to the left of the image. This plugin is also built into stock QGIS. Enable it through the Plugins > Plugins > Manage and Install Plugins menu. Start it by clicking the Coordinate Capture button:

![alt text](https://github.com/RLey/wsu-tunnel-app/blob/Development/WSU_Floorplans/README/Coordinate_Capture_Button.png "Coordinate Capture Button")

Click the Start Capture button, then click anywhere on the image to get the X/Y coordinate (remember to reverse them to get the latitude/longitude)

#### Connection Length Measurement

## Formatting Data

## Uploading Data to MySQL Database
***To be written***
