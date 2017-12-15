// david vesseur 10901272
function awesome() {
  
 // make variables to use
 var margin = {
  top: 40,
  right: 60,
  bottom: 30,
  left: 40
 };
 var width = 400 - margin.left - margin.right;
 var height = 200 - margin.top - margin.bottom;
 var landen = ["#NL-DR", "#NL-NB", "#NL-NH", "#NL-GR", "#NL-FR", "#NL-OV", "#NL-FL", "#NL-GE", "#NL-UT", "#NL-ZH", "#NL-ZE", "#NL-LI"]
 var pop = [491792, 491792, 2809483, 583581, 646874, 1147687, 407818, 2047901, 1284504, 3650222, 381568, 1117546]

 // set the scale of the x and y axis
 const x = d3.scale.linear()
  .domain([1995, 2015])
  .range([0, width]);

 const y = d3.scale.linear()
  .domain([0, 60])
  .range([height, 0]);

 // make linear scale const z to use for cross hair positioning
 const z = d3.scale.linear()
  .domain([1995, 2015])
  .range([0, width]);

 const line = d3.svg.line()
  .x(function(d) {
   return x(d.year);
  })
  .y(function(d) {
   return y(d.population);
  })

 const chart = d3.select('.chart').append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

 // define tooltip
 const tooltip = d3.select('#tooltip');
 const tooltipLine = chart.append('line');

 // add the axes and a title
 const xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(4).tickFormat(d3.format("4."));
 const yAxis = d3.svg.axis().scale(y).orient("left").ticks(4);
 chart.append('g').call(yAxis);
 chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
 chart.append('text').html('< 15 jaar').attr('x', width + 15).attr("y", 30);
 chart.append('text').html('15 - 20 jaar').attr('x', width + 15).attr("y", 50);
 chart.append('text').html('20 - 30 jaar').attr('x', width + 15).attr("y", 70);

 // select chars
 var svgContainer = d3.select(".chart")

  // make the circles for the legend
 var circle = svgContainer.append("circle")
  .attr("cx", width + margin.left + 7)
  .attr("cy", 25 + margin.top)
  .attr("r", 5)
  .style("fill", "red");
 var circle = svgContainer.append("circle")
  .attr("cx", width + margin.left + 7)
  .attr("cy", 45 + margin.top)
  .attr("r", 5)
  .style("fill", "green");
 var circle = svgContainer.append("circle")
  .attr("cx", width + margin.left + 7)
  .attr("cy", 65 + margin.top)
  .attr("r", 5)
  .style("fill", "blue");

 // load data and check error
 d3.xml("test.svg", "image/svg+xml", function(error, xml) {
  if (error) throw error;
  document.body.appendChild(xml.documentElement);

  return test()

 });

 function test() {
  // select body
  var body = d3.select("body"),
   // use scale to make a nece color sceme based on the population
   color = d3.scale.linear().domain([0, 4000000])
   .range([d3.rgb('#00FF00'), d3.rgb("#004000")]);
  // fill with the apropriate color
  for (var i = 0; i < landen.length; i++) {
   d3.select(landen[i]).style("fill", function(d) {
    return color(pop[i]);
   });
  }

  var colorScale = d3.scale.linear()
   .range([d3.rgb('#00FF00'), d3.rgb("#004000")]);

  var svgLegend = d3.select(".map")
  var text = svgLegend.append("text").html('bevolking:').attr('x', margin.left).attr("y", 115 + margin.top);
  var text = svgLegend.append("text").html('0').attr('x', margin.left + 15).attr("y", 129 + margin.top)
  var text = svgLegend.append("text").html('2.000.000').attr('x', margin.left + 15).attr("y", 149 + margin.top)
  var text = svgLegend.append("text").html('4.000.000').attr('x', margin.left + 15).attr("y", 169 + margin.top)
  var circle = svgLegend.append("circle")
   .attr("cx", margin.left + 7)
   .attr("cy", 125 + margin.top)
   .attr("r", 6)
   .style("fill", "#00FF00");
  var circle = svgLegend.append("circle")
   .attr("cx", margin.left + 7)
   .attr("cy", 145 + margin.top)
   .attr("r", 6)
   .style("fill", "00A800");
  var circle = svgLegend.append("circle")
   .attr("cx", margin.left + 7)
   .attr("cy", 165 + margin.top)
   .attr("r", 6)
   .style("fill", "004000");
  // select svg and execute mouse functions
  var svg = d3.select(".map")

  svgContainer = svg.selectAll(".land")
   .on("mouseover", onHoverProv)
   .on("mouseout", outHoverProv)
   .on("click", onClickProv);
 }

 function onClickProv() {
  // set old click's opacity back to normal and remove class
  d3.selectAll(".click").style("opacity", 1).attr("class", null)
   // select the clicked item and change opacity and add class click
  d3.select(this).style("opacity", 0.3).attr("class", "click");
  var json = d3.select(this).id
   // select id of item add the directiory and .json to load the data
  var str = d3.select(this).attr('id')
  var load = "Data/" + str + ".json"
  drawdata(load)
 }

 function onHoverProv() {

  // select the onhover object and change opacity and class

  d3.select(this).style("opacity", 0.7).attr("class", "hover")
 }

 function outHoverProv() {
  d3.select(".tooltip").attr("")
   // select the hover class change opacity back to 1 and delete the class
  d3.selectAll(".hover").style("opacity", 1).attr("class", null);
 }
 // load the initial data and draw the lines
 let catagory, tipBox;
 d3.json("Data/NL-NH.json", function(error, d) {
  if (error) alert("no data");
  console.log(d);
  catagory = d;
  drawfunction(catagory);
 });

 // draw graph
 function drawfunction(catagory) {
  // select data and draw line
  chart.selectAll()
   .data(catagory).enter()
   .append('path')
   .attr("id", "line")
   .attr('fill', 'none')
   .attr('stroke', d => d.color)
   .attr('stroke-width', 2)
   .datum(d => d.history)
   .attr('d', line);

  // display tooltip and box
  tipBox = chart.append('rect')
   .attr('width', width)
   .attr('height', height)
   .attr('opacity', 0)
   .on('mousemove', drawTooltip)
   .on('mouseout', removeTooltip);

  // remove tooltip
  function removeTooltip() {
   if (tooltip) tooltip.style('display', 'none');
   if (tooltipLine) tooltipLine.attr('stroke', 'none');
  }

  // draw tooltip
  function drawTooltip() {
   // calculate year
   var year = Math.floor((z.invert(d3.mouse(tipBox.node())[0]) + 2.5) / 5) * 5;

   // search for data
   catagory.sort((a, catagory) => {
    return catagory.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
   });

   // define line
   tooltipLine.attr('stroke', 'black')
    .attr('x1', x(year))
    .attr('x2', x(year))
    .attr('y1', 0)
    .attr('y2', height);

   // display data

   tooltip.html(year)
    .style('display', 'block')
    .style('left', d3.event.pageX + 20)
    .style('top', d3.event.pageY - 20)
    .selectAll()
    .data(catagory).enter()
    .append('div')
    .style('color', d => d.color)
    .html(d => d.name + ': ' + d.history.find(h => h.year == year).population);
  }

 };


 function drawdata(str) {
  // delete the old lines
  d3.selectAll("path#line").remove();

  // load the selected data
  d3.json(str, function(error, d) {
   if (error) alert("nodata");
   console.log(d);
   catagory = d;
   drawfunction(catagory);
  });

  // draw graph
  function drawfunction(catagory) {

   // select data and draw line
   chart.selectAll()
    .data(catagory).enter()
    .append('path')
    .attr("id", "line")
    .attr('fill', 'none')
    .attr('stroke', d => d.color)
    .attr('stroke-width', 2)
    .datum(d => d.history)
    .attr('d', line);

   // display tooltip and box
   tipBox = chart.append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('opacity', 0)
    .on('mousemove', drawTooltip)
    .on('mouseout', removeTooltip);

   // remove tooltip
   function removeTooltip() {
    if (tooltip) tooltip.style('display', 'none');
    if (tooltipLine) tooltipLine.attr('stroke', 'none');
   }

   // draw tooltip
   function drawTooltip() {

    // calculate year
    var year = Math.floor((z.invert(d3.mouse(tipBox.node())[0]) + 2.5) / 5) * 5;

    // search for data
    catagory.sort((a, catagory) => {
     return catagory.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
    });

    // define line
    tooltipLine.attr('stroke', 'black')
     .attr('x1', x(year))
     .attr('x2', x(year))
     .attr('y1', 0)
     .attr('y2', height);

    // display data
    tooltip.html(year)
     .style('display', 'block')
     .style('left', d3.event.pageX + 20)
     .style('top', d3.event.pageY - 20)
     .selectAll()
     .data(catagory).enter()
     .append('div')
     .style('color', d => d.color)
     .html(d => d.name + ': ' + d.history.find(h => h.year == year).population);
   }
  }
 };
}
