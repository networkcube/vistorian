/// <reference path="./dynamicgraph.ts" />

module networkcube{
	
	/**
    * Calculates an ordering for the passed graph and time span
    * @param  {DynamicGraph} dgraph [description]
    * @param  {Time}         start  [description]
    * @param  {Time}         end    [description]
    * @return {[type]}              [description]
    */
	export function orderNodes(graph:DynamicGraph, config?:OrderingConfiguration):number[]{
	    var max:number = 0;
        var similarityMatrix:number[][] = [];
        var order:number[] = graph.nodes().ids();

		var distance = config.distance ? config.distance : science.stats.distance.manhattan;
        var nodes = config.nodes ? config.nodes : graph.nodes().toArray();
        var links = config.links ? config.links : graph.links().toArray();
        var start = config.start ? config.start : graph.startTime;
        var end = config.end ? config.end : graph.endTime;

        // console.log('-> yeah! Reorder!')
		// init similarity matrix with all 0.
        var arr:number[];
        for (var i=0 ; i<nodes.length ;i++) {
            arr = []
            similarityMatrix.push(arr);
            for (var j=0 ; j< nodes.length; j++) {
                similarityMatrix[i].push(0);
            }
        }
		// fill matrix
        var weight = 0;
        var l:Link;
        var s:number;
        var t:number;
        // console.log('order with', links.length, 'links and ', nodes.length,  'nodes');
        for (var i=0 ; i<links.length ;i++) {
            weight = 0;
            // check if nodes are in allowed nodes
            s = nodes.indexOf(links[i].source)
            t = nodes.indexOf(links[i].target)
            if(s == -1 || t == -1)
                continue;
                
            // get weight in allowed time span                 
            weight += links[i].weights(start, end).mean();
            if(weight){
                similarityMatrix[s][t] = weight;
                similarityMatrix[t][s] = weight;            
            }else{
                console.log('weight', weight);
            }
        }
        
        // console.log('similarityMatrix', similarityMatrix)
        // Reorder
        var leafOrder = reorder.leafOrder()
			.distance(distance)(similarityMatrix);
			
        // console.log(leafOrder);
        leafOrder.forEach(function (lo, i) {
            order[nodes[lo].id()] = i;
        });

   		return order;
   	}
   
   
   
   export class OrderingConfiguration{
	    start:Time;
	    end:Time;
	    nodes:Node[];
	    links:Link[];
	    algorithm:string[];
	    distance:string[];
    }
}