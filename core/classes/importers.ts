module networkcube{
    
    
    export function loadDyson(url:string, callback:Function){
        d3.json(url, (data)=>{
            // create node table
            var nodeTable=[]
            var nodeSchema = {id:0, label:1}
            var nodes = data.nodes;
            for(var i=0 ; i < nodes.length ; i++){
                nodeTable.push([i, nodes[i].name]);
            }
            var linkTable = []
            var linkSchema = {id:0, source:1, target:2, weight: 3, time: 4}
            var times = data.times;
            var m
            for(var i=0 ; i <times.length ; i++){
                m = times[i].matrix;
                for(var s=0 ; s <m.length ; s++){
                    for(var t=0 ; t <m.length ; t++){
                        linkTable.push([s*m.length +t, s, t, m[s][t], i])
                    }                
                }                
            }  
            callback(new DataSet({
                    nodeTable: nodeTable,
                    linkTable: linkTable,
                    linkSchema: linkSchema,
                    nodeSchema: nodeSchema,
                    name: url
                })
            )
        })

    }

    /** Loads a .csv file from the indicated url*/
    // does not check for locations
    export function loadLinkTable(
        url:string, 
        callBack:Function,
        linkSchema: networkcube.LinkSchema,
        delimiter:string,
        timeFormat?:string 
        ) :void{

            if(timeFormat == undefined)
                timeFormat = 'x';
            
            console.log('linkSchema', linkSchema)

            // Check if linkSchema is well defined: 
            if(linkSchema.source == undefined){
                console.error('[n3] Link Schema does not have -source- attribute. Import aborted.')
                return 
            }
            if(linkSchema.target == undefined){
                console.error('[n3] Link Schema does not have -target- attribute. Import aborted.')
                return 
            }

            $.get(url, (linkData)=>{
                var linkData = Papa.parse(linkData, {}).data;

                // get references to tables
                var nodeTable: any[] = [];
                
                // var nodeIds: number[] = [];
                var names: string[] = [];
                var nodeTimes: number[][] = [];
                
                var nodeSchema:networkcube.NodeSchema = new networkcube.NodeSchema(0);
                nodeSchema.label = 1;
                var id_source: number;
                var id_target: number;
                var name: string;

                var linkTable:any[] = []
                var newLinkSchema:networkcube.LinkSchema = new networkcube.LinkSchema(0,1,2);
                // fill new link schema
                var colCount = 3
                for(var prop in linkSchema){
                    if(prop != 'source' && prop != 'target')
                    newLinkSchema[prop] = colCount++;
                }

                // Create node table
                // skip first row, as 1st row contains header information
                linkData.shift();
                
                var linkRow;
                for (var i = 0; i < linkData.length; i++) {
                    if(linkData[i].length == 0 || linkData[i][0].length == 0){
                        continue;
                    }
                    linkRow = new Array(colCount)
                    if(linkSchema.id == undefined)
                        linkRow[0] = linkTable.length;
                    else
                        linkRow[0] = linkData[i][linkSchema.id];
                    
                    // remove whitespace in table entries

                    for(var j=0 ; j <linkData[i].length ; j++){
                         linkData[i][j] = linkData[i][j].trim();
                    }

                    // sources
                    name = linkData[i][linkSchema.source];
                    if (names.indexOf(name) == -1) {
                        names.push(name);
                    }
                    id_source = names.indexOf(name);

                    // targets
                    name = linkData[i][linkSchema.target];
                    if (names.indexOf(name) == -1) {
                        names.push(name);
                    }
                    id_target = names.indexOf(name);

                    // replace node names by node indices
                    linkRow[newLinkSchema.source] = id_source
                    linkRow[newLinkSchema.target] = id_target

                    // format weight
                    if(linkSchema.weight != undefined){
                        linkRow[newLinkSchema.weight] = Number(linkData[i][linkSchema.weight]);
                    }
                    // format time
                    if(linkSchema.time != undefined){
                        linkRow[newLinkSchema.time] = moment(linkData[i][linkSchema.time], timeFormat).format(networkcube.timeFormat())
                    }
                    // copy remaining attributes (linkType, weight, etc..)
                    for(var prop in linkSchema){
                        if(prop != 'source' && prop != 'target' && prop != 'time' && prop != 'weight' ){
                          linkRow[newLinkSchema[prop]] = linkData[i][linkSchema[prop]];
                        }
                    }
                    linkTable.push(linkRow)
                }                
                
                // create node table from node name list
                for(var i=0 ; i < names.length ; i++){
                    nodeTable.push([i, names[i]])
                }

                var dataSet = new DataSet({
                    nodeTable: nodeTable,
                    linkTable: linkTable,
                    linkSchema: newLinkSchema,
                    nodeSchema: nodeSchema,
                    name: url
                })
                if(linkSchema.time != undefined){
                    dataSet.timeFormat = networkcube.timeFormat() 
                }

                callBack(dataSet);
               
            }, 'text')
    }
    
    export function loadXML(url:string, callBack:Function):void{
        var d:DataSet;
        var url = url;
        var dataset;
        var callBack = callBack;
         
        d3.xml(url, "application/xml", (data)=>{
            console.log('data:', data)
            var nodes = data.documentElement.getElementsByTagName("node")
            var nodeTable = [];
            var nodeIds = []
            var nodeSchema = {id:0, label:1, nodeType:2}
            for(var i=0 ; i<nodes.length ; i++){
                nodeTable.push([nodeTable.length, nodes[i].getAttribute('name'), nodes[i].getAttribute('type')])
                nodeIds.push(nodes[i].id)
            }   
            var linkTable = [];
            var line = [];
            var link;
            var linkSchema = new LinkSchema(0,1,2);
            var links = data.documentElement.getElementsByTagName("edge")
            var s, t;
            var sPrev, tPrev;
            for(var i=0 ; i<links.length ; i++){
                s = nodeIds.indexOf(links[i].getAttribute('source'));
                t = nodeIds.indexOf(links[i].getAttribute('through'));
                if(sPrev == s && tPrev == t){
                    continue;    
                }
                sPrev = s;
                tPrev = t;
                linkTable.push([linkTable.length, s, t]);
            }            
            callBack(new DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable, 
                linkTable: linkTable, 
                nodeSchema: nodeSchema, 
                linkSchema: linkSchema 
            }));
        });
    }
    
    /** Loads a .json file from the indicated url. 
     * The json must have a 'nodes/vertices' and a 'links/edge/connections/relations' array.
    */
    export function loadJson(url:string, callBack:Function, dataName?:string):void{
        var d:DataSet;
        var url = url;
        var dataset;
        var callBack = callBack;
         
        d3.json(url, (data)=>{
            if(!data)
                return;
            
            // fill edge table
            var links = data.links
            if(!links)
                links = data.edges;
            if(!links)
                links = data.connections;
            if(!links)
                links = data.relations;

            var linkTable = [];
            var line = [];
            var link;
            var linkSchema = {id: 0, source: 1, target:2, weight: 3};
            var weight;
            var linkUserProps = []
            var prop;
            
            // check for user-properties to complete schema
            for(var i=0 ; i<links.length ; i++){
                link = links[i]
                for(prop in link){
                    // console.log('link prop: ', prop)
                    if(link.hasOwnProperty(prop)
                    && prop != 'id'
                    && prop != 'linkType'
                    && prop != 'time'
                    && prop != 'name'
                    && prop != 'source'
                    && prop != 'target'
                    && prop != 'weight'
                    && prop != 'directed'){
                        if(linkSchema[prop] == undefined){                           
                            linkUserProps.push(prop);                     
                            linkSchema[prop] = 3 + linkUserProps.length;
                        }
                    }
                }      
            }    
            // collect data from links
            for(var i=0 ; i<links.length ; i++){
                link = links[i]
                weight = 1;
                if(link.weight != undefined)
                    weight = link.weight;

                line = [i ,link.source, link.target, weight];
                for(var p=0 ; p < linkUserProps.length ; p++){
                    prop = linkUserProps[p];
                    if(link[prop] == undefined){
                        line.push(undefined)
                    }else{
                        line.push(link[prop])
                    }
                }
                linkTable.push(line)    
            }    
                
            // fill node table
            var nodes = data.nodes
            if(!nodes)
                nodes = data.vertices;
            
            var node;
            var nodeTable = [];
            var locationTable = []; // location table in case there are locations
            var locationSchema = {id:0, longitude:1, latitude:2}; // location table in case there are locations
            var locationEntry = [];           
            var nodeSchema = {id:0, label:1};
            var nodeUserProperties = []
            for(var i=0 ; i<nodes.length ; i++){
                node = nodes[i];
                // if(node.lng && node.lat){
                //     locationTable.push([locationTable.length, node.lng, node.lat])
                //     nodeSchema['location'] = 3
                //     line.push(locationTable.length-1)
                // }   
                for(prop in node){
                    // console.log('node prop: ', prop)
                    if(node.hasOwnProperty(prop)
                    && prop != 'id'
                    && prop != 'label'
                    && prop != 'time'
                    && prop != 'name'
                    && prop != 'nodeType'
                    && prop != 'location'
                    && prop != 'constructor'){
                        if(nodeSchema[prop] == undefined){
                            console.log('node user-prop found', prop)
                            nodeUserProperties.push(prop)                    
                            nodeSchema[prop] = 1 +nodeUserProperties.length; 
                        }  
                    }
                }      
            }    
            for(var i=0 ; i<nodes.length ; i++){
                node = nodes[i]
                line = [i];
                if(node.name){
                    line.push(node.name)
                }else
                if(node.label){
                    line.push(node.label)
                }else{
                    line.push(''+i)
                }
                // if(node.group){
                //     line.push(node.group)
                // }else{
                //     line.push('0')
                // }
                       
                // check for user-properties
                for(var p=0 ; p < nodeUserProperties.length ; p++){
                    prop = nodeUserProperties[p];
                    if(node[prop] == undefined){
                        line.push(undefined)
                    }else{
                        line.push(node[prop])
                    }
                }  
                // console.log('node line', line);
                nodeTable.push(line)    
            }       
            // console.log('>>locationTable', locationTable);
            
            if(dataName == undefined)
                dataName = url.split('=')[0]; 
            callBack(new DataSet({
                name: dataName,
                nodeTable: nodeTable, 
                locationTable:locationTable,
                linkTable: linkTable, 
                nodeSchema: nodeSchema, 
                locationSchema:locationSchema,
                linkSchema: linkSchema 
            }));
        })
    
    }
    export function loadJsonList(url:string, callBack:Function):void{
        var d:DataSet;
        var url = url;
        var dataset;
        var callBack = callBack;
         
        d3.json(url, (data)=>{
            console.log('data:', data)
            if(!data)
                return;
            
            // fill node and link table
            var linkTable = [];
            var line = [];
            var link;
            var linkSchema = new LinkSchema(0,1,2);
            var nodes = data;
            var node;
            var nodeTable = [];
            var nodeSchema = new NodeSchema(0);
            var nodeNames = []
            for(var i=0 ; i<nodes.length ; i++){
                node = nodes[i]
                line = [i];
                if(node.name){
                    line.push(node.name)
                    nodeSchema.label = 1;
                }
                if(node.label){
                    line.push(node.name)
                    nodeSchema.label = 1;
                }
                nodeNames.push(node.name)
                nodeTable.push(line)    
            } 
            // links
            var s, t;
            for(var i=0 ; i<nodes.length ; i++){
                for(var j=0 ; j<nodes[i].imports.length ; j++){
                    s = nodeNames.indexOf(nodes[i].name);
                    t = nodeNames.indexOf(nodes[i].imports[j])
                    if(s == -1 || t == -1)
                        console.error('---');
                    else        
                       linkTable.push([linkTable.length, s, t]);
                }
            } 
            
            callBack(new DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable, 
                linkTable: linkTable, 
                nodeSchema: nodeSchema, 
                linkSchema: linkSchema 
            }));
        })
    
    }
    
    /** Loads a .graphML file from the indicated url*/
    function loadGraphML(url:string, callBack:Function):void{
        
    }
    
    /** Loads a .tables file from the indicated url.
    */
    function loadTables(url:string, callBack:Function):void{
    }
    
    export function loadNCube(url:string, callBack:Function): void {
        var d:DataSet;
        var url = url;
        var dataset;
        var callBack = callBack;
         
        d3.json(url, (data)=>{
       
            var nodeTable: any[][] = [];
            var linkTable: any[][] = [];

            var nodeSchema: networkcube.NodeSchema = new networkcube.NodeSchema(0);
            nodeSchema.id = 0;
            nodeSchema.label = 1;
            nodeSchema.nodeType = 2;
            
            // create node table:
            for (var i = 0; i < data.nodes.length; i++) {
                console.log('data.nodes[i].name.substring(0,3)', data.nodes[i].name.substring(0, 3))
                nodeTable.push(
                    [
                        data.nodes[i].nodeId,
                        data.nodes[i].name,
                        data.nodes[i].name.substring(0, 3) // create node type for brain regions
                    ]
                )
            }

            var linkSchema: networkcube.LinkSchema = new networkcube.LinkSchema(0, 1, 2);
            linkSchema.id = 0;
            linkSchema.source = 1;
            linkSchema.target = 2;
            linkSchema.time = 3;
            linkSchema.weight = 4;
                
            // create link table
            // data.edges = data.edges.slice(0,20000);
            for (var i = 0; i < data.edges.length; i++) {
                linkTable.push(
                    [
                        data.edges[i].edgeId,
                        data.edges[i].sourceNodeId,
                        data.edges[i].targetNodeId,
                        moment().add(data.edges[i].timeIndex, 'seconds').format('YYYY-MM-DD hh:mm:ss'),
                        data.edges[i].weight
                    ]
                )
            }

            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }))
        });
    }
    
    export function loadPajek(url:string, callBack:Function): void {
            var d:DataSet;
        var url = url;
        var dataset;
        var callBack = callBack;
        
        $.get(url, (data)=>{
            var lines = data.split('\n')
            var nodeTable = []
            var nodeSchema = {id:0, label:1}
            var linkTable = []
            var linkSchema = {id:0, source:1, target:2, directed:3}
            var parseType = ''
            var line;
            for(var i=0 ; i<lines.length ; i++){
                line = lines[i];
                
                // define data type
                if(line.indexOf('*Vertices') > -1){
                    parseType = 'nodes';
                    continue;
                } else
                if(line.indexOf('*Arcs') > -1){
                    parseType = 'undirectedLinks';
                    continue;
                }else
                if(line.indexOf('*Edges') > -1){
                    parseType = 'directedLinks';
                    continue;
                }
                
                // prepare and clean line
                line = line.trim();
                line = line.split(' ')
                for(var j=0 ; j<line.length ; j){
                    if(line[j].length == 0){
                        line.splice(j,1)
                    }else{
                        j++;
                    }                             
                }
                if(line.length == 0)
                    continue;
                    
                // parse data
                if(parseType.indexOf('nodes') > -1){
                    nodeTable.push([nodeTable.length, line[1]]);
                }else
                if(parseType.indexOf('undirectedLinks') > -1){
                    linkTable.push([linkTable.length, parseInt(line[0])-1, parseInt(line[1])-1, false]);
                }else                        
                if(parseType.indexOf('directedLinks') > -1){
                    linkTable.push([linkTable.length, parseInt(line[0])-1, parseInt(line[1])-1, true]);
                }
            }
            
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }))              
        });
    }
    
    export function loadMat(url:string, callBack:Function): void {
            var d:DataSet;
        var url = url;
        var dataset;
        var callBack = callBack;
        
        $.get(url, (data)=>{
            var lines = data.split('\n')
            var nodeTable = []
            var nodeSchema = {id:0, label:1}
            var linkTable = []
            var linkSchema = {id:0, source:1, target:2}
            var parseType = '';
            var line;
            var rowCount=0;
            var currRow = 0;
            for(var i=0 ; i<lines.length ; i++){
                line = lines[i];

                // define data type
                if(line.indexOf('ROW LABELS') > -1){
                    parseType = 'rows';
                    continue;
                } else
                if(line.indexOf('COLUMN LABELS') > -1){
                    parseType = 'cols';
                    continue;
                }else
                if(line.indexOf('DATA:') > -1){
                    parseType = 'links';
                    continue;
                }
                if(parseType.length == 0)
                    continue;
                    
                line = line.trim();
                line = line.split(' ');
                if(parseType.indexOf('rows') > -1){
                    nodeTable.push([nodeTable.length, line[0]])
                    rowCount++;
                }else                
                if(parseType.indexOf('cols') > -1){
                    if(line[0].indexOf(nodeTable[0][1] > -1)){
                        parseType = '';
                        rowCount = 0;
                        continue;    
                    }
                    nodeTable.push([nodeTable.length, line[0]])
                }else                
                if(parseType.indexOf('links') > -1){
                    for(var j=0 ; j<line.length; j++){
                        if(parseInt(line[j]) == 1){
                            linkTable.push([linkTable.length, currRow, rowCount+1])
                        }
                    }
                    currRow++;
                }
            }
            // console.log('-->nodeTable:', nodeTable)
            // console.log('-->linkTable:', linkTable)
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }))     
        })
    }
    
    
    export function loadGEDCOM(url:string, callBack:Function): void {
        var d:DataSet;
        var url = url;
        var dataset;
        var callBack = callBack;
        var nodeTable = []
        var nodeSchema = {id:0, label:1, nodeType:2}
        var linkTable = []
        var linkSchema = {id:0, source:1, target:2}
        var line;
        var s, t;
        
        $.get(url, (data)=>{
            data = data.split('\n');
            var line; 
            var currPersonId;
            var personIds = [];
            var personSex = [];
            var familiyIds = []
            var familiyChildren = []
            var familiyHusband = []
            var familiyWife = []
            for(var i=0 ;i<data.length ; i++){
                line = data[i].replace(/@/g, '');
                line = line.split(' ')
                // parsing persons
                if(line.length < 3)
                    continue;
                    
                if(parseInt(line[0]) == 0 && line[2].indexOf('INDI')> -1){
                    personIds.push(line[1].trim());    
                    personSex.push('');
                }
                else
                if(parseInt(line[0]) == 1 && line[1].indexOf('SEX')> -1){
                    personSex[personSex.length-1] = line[2].trim();    
                }
                else
                if(parseInt(line[0]) == 0 && line[2].indexOf('FAM') > -1){
                    familiyIds.push(line[1].trim());
                    familiyChildren.push([])   
                    familiyHusband.push(undefined) 
                    familiyWife.push(undefined) 
                }
                else
                if(parseInt(line[0]) == 1 && line[1].indexOf('CHIL')> -1){
                    familiyChildren[familiyChildren.length-1].push(line[2].trim());    
                }
                else
                if(parseInt(line[0]) == 1 && line[1].indexOf('HUSB')> -1){
                    familiyHusband[familiyChildren.length-1] = line[2].trim();    
                }
                else
                if(parseInt(line[0]) == 1 && line[1].indexOf('WIFE')> -1){
                    familiyWife[familiyChildren.length-1] = line[2].trim();    
                }
            }
            
            for(var fi=0 ;fi<personIds.length ; fi++){
                nodeTable.push([fi, personIds[fi], personSex[fi]]);
            }

            
            var hi, wi, ci
            var nodeNames = [];
            for(var fi=0 ;fi<familiyIds.length ; fi++){
                hi = personIds.indexOf(familiyHusband[fi]);
                wi = personIds.indexOf(familiyWife[fi]);
                console.log('-->', hi,wi, familiyHusband[fi], familiyWife[fi])
                for(var i=0 ;i<familiyChildren[fi].length ; i++){
                    ci = personIds.indexOf(familiyChildren[fi][i]);
                    if(ci==undefined || ci==-1)
                        continue;
                    if(hi != undefined && hi >-1)
                        linkTable.push([linkTable.length, hi, ci])
                    if(wi != undefined && wi >-1)
                        linkTable.push([linkTable.length, wi, ci])
                }
            }               
            
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }))     
        })
    }
    
    export function loadLinkList(url:string, callBack:Function): void {
        var d:DataSet;
        var url = url;
        var dataset;
        var callBack = callBack;
        
        $.get(url, (data)=>{
            var lines = data.split('\n')
            var nodeTable = []
            var nodeSchema = {id:0, label:1}
            var linkTable = []
            var linkSchema = {id:0, source:1, target:2, weight:3};
            var line
            var s, t;
            for(var i=0 ; i<lines.length ; i++){
                line = lines[i];
                if(line.indexOf('#') == -1){
                    break;
                }                    
            }
            var DEL = ' ';
            if(lines[i].indexOf(',') > -1)
                DEL = ','
            else if(lines[i].indexOf('\t') > -1)
                DEL = '\t'
                
            var nodeLabels = [];    
            var weight;
            for(i ; i<lines.length ; i++){
                line = lines[i]
                line = line.split(DEL);
                for(var j=0 ; j<line.length ; j){
                    if(line[j].length == 0){
                        line.splice(j,1)
                    }else{
                        j++;
                    }                             
                }
                if(line.length < 2)
                    continue;
                    
                s = line[0].toLowerCase();
                if(s == undefined || s == '')
                    continue;

                var si = nodeLabels.indexOf(s)
                if(si == -1){
                    si = nodeLabels.length;
                    nodeLabels.push(s)
                }
                
                t = line[1].toLowerCase();
                if(t == undefined)
                    continue;
                t = t.trim();
                var ti = nodeLabels.indexOf(t)
                if(ti == -1){
                    ti = nodeLabels.length;
                    nodeLabels.push(t)
                }
                
                weight = 1;
                // if(line.length >= 3){
                //     weight = line[2];
                // }    
                linkTable.push([linkTable.length, si, ti, weight])                    

                // for(var j=1 ; j<line.length ; j++){
                //     t = line[j]
                //     console.log('\tt', t)
                //     if(t == undefined)
                //         continue;
                //     t = t.toLowerCase().trim();
                //     var ti = nodeLabels.indexOf(t)
                //     if(ti == -1){
                //         ti = nodeLabels.length;
                //         nodeLabels.push(t)
                //     }
                //     linkTable.push([linkTable.length, si, ti])                    
                // }
            }
            for(i=0 ; i<=nodeLabels.length ; i++){
                nodeTable.push([i, nodeLabels[i]+ '']);
            }
            
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }))     
        })
    }
    
    export function loadMatrix(url:string, callBack:Function): void {
        var d:DataSet;
        var url = url;
        var dataset;
        var callBack = callBack;
        
        $.get(url, (data)=>{
            var lines = data.split('\n')
            var nodeTable = []
            var nodeSchema = {id:0, label:1}
            var linkTable = []
            var linkSchema = {id:0, source:1, target:2}
            var parseType = '';
            var line;
            var rowCount=0;
            var currRow = 0;
            var nodeNames = [];
            var label
            // get nodes from rows
            var line = lines[0].trim().split(',')
            for(var i=0 ; i<line.length ; i++){
                label = line[i].trim();
                nodeTable.push([nodeTable.length, label])
                nodeNames.push(label)    
            }
            var t;
            for(var i=1 ; i<lines.length ; i++){
                line = lines[i];
                line = line.trim();
                line = line.split(',');
                t = nodeNames.indexOf(line[0].trim())
                if(t == -1){
                    console.error('Node', line[0], 'not defined')
                    continue;    
                }
                for(var j=1 ; j<line.length; j++){
// ?                    if(j<10)console.log('line[j].replace(' ', '')', line[j].replace(/\s/g, ''))
                    if(line[j].length > 0 && parseInt(line[j].replace(/\s/g, '')) > 300000){
                        linkTable.push([linkTable.length, t, j-1])
                    }
                }
            }
            console.log('---->nodes found:', nodeTable.length)
            console.log('---->links found:', linkTable.length)
            callBack(new networkcube.DataSet({
                name: url.split('=')[0],
                nodeTable: nodeTable,
                linkTable: linkTable,
                nodeSchema: nodeSchema,
                linkSchema: linkSchema
            }))     
        })
    }
    
    
        
   
    
    
    /// EXPORTERS
    
    /** Returns a csv table representation of this graph. It should be the same as
     * the input table format (fix!) 
     * Currently: returns simple list of node index pairs.
     */
    export function exportCSV(graph):string{
        var csv:string = '';
        var DEL = ',';
        var ST = '';
        var BR = '\n';
        for(var i=0 ; i<graph.links().length ; i++){
            csv += ST + graph.link(i).source.id() + ST + DEL 
                    + ST + graph.link(i).target.id() + ST + BR
        }
        return csv; 
    }
    
    
    
    /// HELPER FUNCTIONS
    
    /** Downloads a string as file.*/
    export function downloadText(text:string, filename:string){
        var textFileAsBlob = new Blob([text], {type:'text/text'});
        var fileNameToSaveAs = filename;
        var downloadLink = document.createElement("a")
        downloadLink.download = fileNameToSaveAs;
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        downloadLink.click();            
    }
    
    
    
    
    // function indexOf(arrayString[], string:String):number{
    //     for (var i=0 ; i<arrayString.length;i++) {
    //         if (arrayString[i].indexOf(string)> -1 && arrayString[i].length == string.length) {
    //             return i;
    //         }
    //     }
    // }
    
    
}
