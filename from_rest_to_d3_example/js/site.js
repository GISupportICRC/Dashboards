/*	Here is an example that shows how to get data from a REST Service through jQuery method (getJSON) and to use it for D3 chart
	--- Uncomment the successive "console.log" instructions to analyse how the program's behaviour toward the data ---
	--- Code for D3 chart is taken from here http://code.tutsplus.com/tutorials/building-a-multi-line-chart-using-d3js--cms-22935  | Part of the data used in this web tutorial has been replicated in the following REST service. See the table commented below --- */

	/*	Write the URL that query the data from the REST service	*/
	var urlFromRest = "https://gis.test.icrc.org/arcgis/rest/services/ICRC/ICRC_Sandbox/MapServer/3/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&f=pjson";
	
	/*	jQuery method --- gets JSON data from the URL (through AJAX HTTP GET request) --- The D3 chart setup is defined inside the getJSON instructions	*/
	$.getJSON(urlFromRest, function(data) {
//console.log(data);					
		var dataset = data.features;
//console.log(dataset);				
		function InitChart() {
					
			var data = dataset;
//console.log(data);
            var vis = d3.select("#visualisation"),
                WIDTH = 1000,
                HEIGHT = 500,
                MARGINS = {
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 50
                    },
                xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000, 2010]),
                yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134, 215]),
                xAxis = d3.svg.axis()
                .scale(xScale),
                yAxis = d3.svg.axis()
                .scale(yScale)
                .orient("left");
                    
            vis.append("svg:g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
                .call(xAxis);
            vis.append("svg:g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + (MARGINS.left) + ",0)")
                .call(yAxis);
            var lineGen = d3.svg.line()
                .x(function(d) {
//console.log(d);
//console.log(d.attributes.year);
                    return xScale(d.attributes.year);
                })
                .y(function(d) {
//console.log(d.attributes.number);
                    return yScale(d.attributes.number);
                })
                .interpolate("basis");
            vis.append('svg:path')
                .attr('d', lineGen(data))
                .attr('stroke', 'green')
                .attr('stroke-width', 2)
                .attr('fill', 'none');
//console.log(data);
		}
        InitChart();
	});
	
/*

	Data from the REST service used above :

	Field names :	|	number	|	year	|
	-----------------------------------------
	Record 1 :		|	202		|	2000	|
	Record 2 :		|	215		|	2002	|
	Record 3 :		|	179		|	2004	|
	Record 4 :		|	199		|	2006	|
	Record 5 :		|	134		|	2008	|
	Record 6 :		|	176		|	2010	|

*/
 