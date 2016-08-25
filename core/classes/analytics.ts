/// <reference path="./dynamicgraph.ts" />

module networkcube{
    
    export function findDegree(nodes:Node[]):Motif[]{
        var motifs:Motif[] = [];
        var ns;
        var ls;
        var finalLinks;
        var n;
        for(var i=0 ; i <nodes.length ; i++){
            n = nodes[i];
            ns = n.neighbors().removeDuplicates().toArray().concat(n);
            ls = n.links().removeDuplicates().toArray();
            motifs.push(new Motif(ns, ls))
        }
        return motifs;
    }    
    
    
    // export function findMotifs(nodeNum:number, nodes:Node[], links:Link[]):Motif[]{
    //     var motifs:Motif[] = [];
    //     if(nodeNum == 2){
    //         motifs = find2Motifs(nodes, links)
    //     }
    //     if(nodeNum == 3){
    //         // motifs = find3Motifs(nodes, links)
    //     }
       
    //     console.log('>> ', motifs.length, 'found.')
    //     return motifs;   
    // }
    
    // function find2Motifs(nodes:Node[], links:Link[]):Motif[]{
    //     var motifs:Motif[] = [];
    //     var l:Link
    //     for(var i=0 ; i<links.length ; i++){
    //         l = links[i]
    //         motifs.push(new Motif([l.source, l.target], [l]))      
    //     }            
    //     return motifs;
    // }
    
    // function find3Motifs(nodes:Node[], links:Link[]):Motif[]{
    //     var motifs:Motif[] = [];
    //     var n:Node, neighbor1:Node, neighbor2:Node;
    //     var neighbors:NodeQuery
    //     var nNeighbors:NodeQuery;
    //     var intersection;
    //     var graph = nodes[0].g;
    //     var l1:Link, l2:Link, l3:Link 
    //     for(var i=0 ; i < nodes.length ; i++){
    //         console.log('checking node for triangle')
    //         n = nodes[i];
    //         neighbors = n.neighbors();
    //         if(neighbors.length < 2)
    //             continue;
    //         for(var j=0 ; j < neighbors.length ; j++){
    //             neighbor1 = neighbors.get(j);
    //             l1 = graph.linksBetween(n, neighbor1).get(0)
    //             if(links.indexOf(l1) == -1)
    //                 continue;
    //             nNeighbors = neighbor1.neighbors();
    //             if(nNeighbors.length < 3)
    //                 continue;
    //             intersection = neighbors.intersection(nNeighbors)
    //             for(var k=0 ; k <intersection.length ; k++){
    //                 neighbor2 = intersection.get(k);
    //                 l2 = graph.linksBetween(neighbor1, neighbor2).get(0)
    //                 if(links.indexOf(l2) == -1)
    //                     continue;
    //                 l3 = graph.linksBetween(n, neighbor2).get(0)
    //                 if(links.indexOf(l3) == -1)
    //                     continue;
    //                 motifs.push(new Motif([n, neighbor1,neighbor2],
    //                     [l1, l2, l3]
    //                 ))
    //             }   
    //         }
    //     }            
    //     return motifs;
    // }

    
    
    
    
    ////////////////////////
    
    
    
    
    
}