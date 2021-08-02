# Vistorian (previous Networkcube)

Vistorian (in previous versions of the code called `networkcube`) is an open-source java script / Typescript library and a programming framework for interactive visualization of networks with the following features:

* different link types
* multiple links between nodes
* link weights
* link direction
* temporal information on links (weigth, presence)
* geographical positions attached to nodes that can change over time.

## Main Features:
The vistorian framework provides a range of packages and functionality:

* **Ready-to-use visualizations** that can be embedded in any web environment, e.g. to provide state-of-the-art visualizations to a specific group of stateholders or in a specific domain. Those visualizations are: 
  * **Node-link visualization**, 
  * **Adjacency matrix**, 
  * **Time-arc visualization** to visualize frequency and topology of links over time 
  * **Map** with overlaid node-link network. 
* **Graph API** to query dynamic, geographic, and multivariate networks with the above-mentioned data features. 
* **Importers** of a range of data types (GML, Paject, Matrix, CSV, JSON, ... )
* **Synchronized views** when, e.g., highlighting a node across all visualizations currently open in the browser. Visualizations can be spread across browser tabs and windows. 

## Design Rationale:

* **Browser-based**: the Vistorian runs entirely in the browser and does not use any server. None of your data is transmitted over the network nor stored on any server.
* **Modular**: the vistorian has a set of `npm` packages can be included into your application. Each package has its own repository and package versions.
  * `vistorian-core`: core functionality for loading and storing networks, querying the graph, etc.
  * `vistorian-web`: a fully implemented web-application using all Vistorian packages. 
  * `vistorian-node`: an interactive node-link diagram implementation with time-slider and interactive filtering
  * `vistoeian-matrix`: a interactive adjacency matrix with different matrix ordering mechanisms, timeslider, and filtering mechanisms
  * `vistorian-dynamicego`: a time-arc visualization to show links over time.
  * `vistorian-map`: a geographic map visualization with overlaid links and nodes. Nodes can change positions over time.  
  * `vistorian-bookmarkbrowser`: a menu widget that provides for search and lists all types of links and nodes in the networks. Allows for filtering (hiding) nodes and links by their type.  
* Vistorian is **designed for research** 
* Vistorian is **open Source** and currently in a prorotype phase. Fork the repositories and contribute to its development. Get involved: [vistorian@inria.fr](mailto:vistorian@inria.fr).
* **Create bespoke visualizations** and grow the set of visualizations for the vistorian. Read more on the wiki page [Creating Visualizations](Create Bespoke Visualizations)

## Technical Specifications

* Networkcube is written in TypeScript (https://www.typescriptlang.org), a typed language that compiles into 
JavaScript.  
* All Vistorian is available as `npm`-packages with the same name as in this repo.
* Data is stored in the browser's local storage, which currently is limited to 5MB. For projects on using larger networks, contact us.
* Vistorian and its visualizations are developed and tested on the Google Chrome browser. They may just work fine on other browsers and platforms but have *not* been tested. Feel free to do so and let us know what happens.
* Visualizations are generally written in D3 or WebGL using the THREE.js library (http://threejs.org).

# More info

Check the Wiki page and our blog for the following topics: 

* [Prepare your data](https://vistorian.github.io/formattingdata.html)
* [Node and Link Schemas](../../wiki/Node and Link Schemas)
* [Graph Query API](Graph Query API)
* [Messages API](Messages API)
* [Widget API](Widget API)
* [Visualizations](https://vistorian.github.io/visualizations.html)
* [Import data](Importing Data)
* [Development](Development)
* [Create Bespoke Visualizations for the Vistorian](Create Bespoke Visualizations)
