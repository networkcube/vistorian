/// <reference path="../../core/networkcube.d.ts" />

var RECT_SIZE:number = 13;
var INTENT:number = 0;
var LINE_HEIGHT:number = 13;
var GAP_ICONS:number = 3;
var OPACITY_ICONS:number = .2;

var width:number = window.innerWidth;
console.log('load vis');


// Get data	
var dgraph:networkcube.DynamicGraph = networkcube.getDynamicGraph();

networkcube.setDefaultEventListener(updateLists);
networkcube.addEventListener('searchResult', searchResultHandler);

// CREATE SEARCH INPUT




// CRETE SELECTION LIST VIEW
// add node selections
createSelectionCategory('Node Selections', 'node');
createSelectionCategory('Link Selections', 'link');
//createSelectionCategory('Time Selections', 'time');

updateLists();

function createSelectionCategory(name:string, type:string){

	var nodeDiv = d3.select('body').append('div')
		.attr('id', 'div_' + type)
	
	nodeDiv.append('p')
		.attr('id', 'title_' + type)
		.html(name + ':')
	
	nodeDiv.append('input')
		.datum(type)
		.attr('type', 'button')
		.attr('value', '+')
		.on('click', function(d){createSelection(d)})

}

function createSelection(type:string){

	var b = networkcube.createSelection(type)
   	var timer = setTimeout((e) => {
		networkcube.setCurrentSelection(b);
		updateLists();
    }, 500);
}

function updateLists(){

	updateList('node', 'Node Selections')
	updateList('link', 'Link Selections')
	//updateList('time', 'Time Selections')

	
	d3.selectAll('.icon_showColor')
		.attr('xlink:href', function(d){if(d.showColor) return 'drop-full.png'; return 'drop-empty.png'})
	d3.selectAll('.icon_eye')
		.attr('xlink:href', function(d){if(d.filter) return 'eye-blind.png'; return 'eye-seeing.png'})

	d3.selectAll('.selectionLabel')
		.text(function(d){return d.name + ' ('+ d.elementIds.length+')'})	
}

function updateList(type:string, name:string){
	var selections = dgraph.getSelections(type)

	var title = d3.select('#title_' + type)
	title.html(name +' ('+ selections.length+ ')');
	

	d3.select('#div_' + type)
		.selectAll('.selectionDiv_'+type)
		.remove();

	var nodeGs = d3.select('#div_' + type)
		.selectAll('.selectionDiv_'+type)
		.data(selections.sort(networkcube.sortByPriority))
		.enter()
		.append('div')
			.attr('class', 'selectionDiv_'+type)
			.attr('height', LINE_HEIGHT)
				.append('svg')
				.attr('class', 'svg_'+type)
				.attr('height', LINE_HEIGHT)
				.attr('width', width)
					.append('g')
					.attr('transform', 'translate('+INTENT+',0)')
			
	d3.selectAll('.selectionDiv_'+type)
		.style('background-color', function(d){
			if(dgraph.currentSelection_id == d.id)
				return '#cccccc';
			return '#ffffff';
		})
		
	nodeGs.append('rect')
		.attr('x', 0)
		.attr('y', 0)
		.attr('width', RECT_SIZE)
		.attr('height', RECT_SIZE)
		.style('fill', function(d){return d.color})
		.on('click', function(d){
			networkcube.setSelectionColor(d, '#'+Math.floor(Math.random()*16777215).toString(16));
		})

	nodeGs.append('text')
		.attr('class','selectionLabel')
		.text(function(d){
			return d.name;})
		.style('font-size', RECT_SIZE)
		.style('font-family', 'Helvetica')
		.attr('x', RECT_SIZE + 10)
		.attr('y', RECT_SIZE*.8)
		.on('click', function(d){
			networkcube.setCurrentSelection(d);
			updateLists();
		})

	// add pictures
	var i=0;
	nodeGs.append('svg:image')
		.attr('class', 'icon_showColor icon')
		.attr('x', 130 + (RECT_SIZE+GAP_ICONS)*i++)	
		.on('click', function(d,i){
			networkcube.showSelectionColor(d, !d.showColor);
		})

	
	nodeGs.append('svg:image')
		.attr('id', 'eye_'+name)
		.attr('class', 'icon_eye icon')
		.attr('xlink:href', 'eye-visible.png')
		.attr('x', 130 + (RECT_SIZE+GAP_ICONS)*i++)		
		.on('click', function(d,i){
			networkcube.filterSelection(d, !d.filter);
		})

	nodeGs.append('svg:image')
		.filter((d)=>{return d.name.indexOf('Unselected') == -1})
		.attr('class', 'icon')
		.attr('xlink:href', 'up.png')
		.attr('x', 130 + (RECT_SIZE+GAP_ICONS)*i++)		
		.on('click', function(d,i){
			if(i>0)
				networkcube.swapPriority(d, d3.selectAll('.selectionDiv_'+d.acceptedType).data()[i-1]);
		})

	nodeGs.append('svg:image')
		.filter((d)=>{return d.name.indexOf('Unselected') == -1})
		.attr('class', 'icon')
		.attr('xlink:href', 'down.png')
		.attr('x', 130 + (RECT_SIZE+GAP_ICONS)*i++)		
		.on('click', function(d,i){
			if(d3.selectAll('.selectionDiv_'+d.acceptedType).data()[i+1])	
				networkcube.swapPriority(d, d3.selectAll('.selectionDiv_'+d.acceptedType).data()[i+1]);
		})
	
	nodeGs.append('svg:image')
		.filter((d)=>{return d.name.indexOf('Unselected') == -1})
		.attr('class', 'icon')
		.attr('xlink:href', 'delete.png')
		.attr('x', 130 + (RECT_SIZE+GAP_ICONS)*i++)		
		.on('click', function(d,i){
			console.log('CLICK')
			networkcube.deleteSelection(d);
		})

	nodeGs.selectAll('.icon')
		.attr('height', RECT_SIZE)
		.attr('width', RECT_SIZE)
		
}

var searchMessage:networkcube.SearchResultMessage;
function searchResultHandler(m:networkcube.SearchResultMessage){
	searchMessage = m;
	$('#searchResults').empty();
	var row = $('#searchResults').append('<li></li>')
	if(m.idCompound.nodeIds)
		row.append('<p class="searchResult">Nodes: <b>'+ m.idCompound.nodeIds.length+'</b> <u onclick="saveSearchResultAsSelection(\'node\')">(Save as selection)</u></p>')
	if(m.idCompound.linkIds)
		row.append('<p class="searchResult">Links: <b>'+ m.idCompound.linkIds.length+'</b> <u onclick="saveSearchResultAsSelection(\'link\')">(Save as selection)</u></p>')
}

function saveSearchResultAsSelection(type:string){
	var s:networkcube.Selection = networkcube.createSelection(type, searchMessage.searchTerm);
    var selectionIdCompound:networkcube.IDCompound = new networkcube.IDCompound();
    selectionIdCompound[type+'Ids'] = searchMessage.idCompound[type+'Ids']
    var temp = networkcube.makeElementCompound(selectionIdCompound, dgraph);
    window.setTimeout(()=>{
		console.log('set selection', selectionIdCompound, s.id)
		networkcube.highlight('reset');
		window.setTimeout(()=>{
			networkcube.selection('set', networkcube.makeElementCompound(selectionIdCompound, dgraph), s.id);
		}, 1000);

	}, 1000);
}

// clear search field and highlighted nodes
function clearSearchSelection(){
	networkcube.highlight('reset');
	$('#searchResults').empty();
}