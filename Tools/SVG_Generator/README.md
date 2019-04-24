# SVG Generator

## Summary

This is a simple HTML Form used to generate an SVG file to be used as a map in the main application.

## How to use

### Latitude Min

Minimum latitude bound for the map

### Latitude Max

Maximum latitude bound for the map

### Longitude Min

Minimum longitude bound for the map

### Longitude Max

Maximum longitude bound for the map

### SVG Y Max

Height of the SVG / Max Y value of the SVG Viewbox

### SVG X Max

Width of the SVG / Max X value of the SVG Viewbox

### Node Radius

Radius of nodes on SVG

### Stroke width

Stroke width of paths on SVG

### File with nodes

Expects a csv with the following format:
| nodeID | lat | long | elev | isIndoors | buildingID | floor | roomNumber | nodeTypeID |
|--------|-----|------|------|-----------|------------|-------|------------|------------|

### File with connections

Expects a csv with the following format:
| connectionID | nodeA_ID | nodeB_ID | length | isIndoors | hasStairs | hasElevator |
|--------------|----------|----------|--------|-----------|-----------|-------------|

### Submit

Downloads a file to your computer named map.svg
