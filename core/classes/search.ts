/// <reference path='./dynamicgraph.ts' />

module networkcube{
	
		
	export function searchForTerm(term:string, dgraph:DynamicGraph, type?:string):IDCompound{
		var terms = term.toLowerCase().split(',');
        
		var result:IDCompound = new IDCompound();
		
		
		for(var i=0 ; i < terms.length ; i++){
			term = terms[i].trim();
			console.log('search term', term)
			if(!type || type == 'node')
				result.nodeIds = result.nodeIds.concat(dgraph.nodes().filter(
					(e:networkcube.Node)=>
						e.label().toLowerCase().indexOf(term) > -1
						|| e.nodeType().toLowerCase().indexOf(term) > -1       
					).ids());				
			if(!type || type == 'link')
				result.linkIds = result.linkIds.concat(dgraph.links().filter(
					(e:networkcube.Link)=>
						e.source.label().toLowerCase().indexOf(term) > -1
						|| e.target.label().toLowerCase().indexOf(term) > -1
						|| e.linkType().indexOf(term) > -1
					).ids());				
			if(!type || type == 'locations')
				result.locationIds = result.locationIds.concat(dgraph.locations().filter(
					(e:networkcube.Location)=>
						e.label().toLowerCase().indexOf(term) > -1       
					).ids());				
		}
		return result;
	}
	
	
	
	/// FILTERS
	
	export interface IFilter{
		test(o:any):boolean;
	}
	
	class StringContainsFilter{
		pattern:string;
		constructor(pattern:string){
			this.pattern = pattern;
		}
		
		test(word:any){
			console.log('contains:' ,word, this.pattern)
			return word.indexOf(this.pattern) > -1;
		}	
	}
	
}