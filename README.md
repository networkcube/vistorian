# Networkcube

Networkcube is a java script library and a programming framework for interactive  networks visualizations with: 

* different link types
* multiple links between nodes
* link weights
* temporal information on links (weigth, existence)
* geographical positions attached to nodes

Networkcube has been build with two goals in mind: 

* Ready-to-use visualizations that can be embedded in any web environment, e.g. to provide state-of-the-art visualizations to a specific group of stateholders or in a specific domain. 
* Rapidly prototype, deploy, and mature novel network visualizations. 

Please read the [Wiki](Home) for more information or contact us: benj.bach@gmail.com.

## Demos and Example Projects

Networkcube has been used in the following projects:

* Vistorian (http://vistorian.net): A visualization platform for the social network visualization.
* ConnectoScope: A visualization platform for brain connectivity in neuroscience

## Components

The Networkcube framework conists of the following components and features: 

* Methods for **loading network data** from various formats, e.g. csv, json, GEDCOM, etc.
* Importing data into the **local storage** of your browser. Data is not uploaded onto any server, unless you provide the 
server and program the backend. Technically, this is possible. Eventually this means that once you the visualization(s) with your data show up on your screen, no internet connection is necessary anymore. Data and events are handled completely locally on your machine.
* an **API to query the network** you stored in the local storage, such as link weights for a certain period, a node's neighbors, links of a certain type. etc.
* an initial **set of common state-of-the-art network visualizations** including Node-Link diagrams, Adjacency Matrices, Dynamic Ego network visualization, and a geographical Map.
Visualizations are referenced via a URL and can hence sit anywhere in the internet. Once the visualization code is loaded
all it needs to do is to query the data from the local storage.
* A **messenger to send events between all the visualizations** in your browser: be they in windows, tabs, or iFrames. Messages pass simple interaction events such as node selection or changes to a time slider for temporal navigation.
* a **WebGl library** that allows writing visualizations in the simple style of the marvelous D3 (https://d3js.org), 
but creating fast WebGL graphics under the hood.


## Technical Specifications

* Networkcube is written in TypeScript (https://www.typescriptlang.org), a typed language that compiles into 
JavaScript.  
* Data is stored in the browser's local storage, which currently is limited to 5MB
* Networkcube and the visualizations are optimized for Google Chrome. They have *not* been tested on other browsers. 
* Visualizations are generally written in WebGL using the THREE.js library (http://threejs.org). Certain parts of the visualizations are implemented in D3.

## Running your own Networkcube

1. Clone this git
2. Run `networcube` on a http server (e.g. python, etc.) 
3. Navigate to `<your_serverpath>/networkcube/index.html`* to run the local demo and test if all is working fine.

* On my machine this looks like `http://localhost:8080/~bbach/networkcube` 
