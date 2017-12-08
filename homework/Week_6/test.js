

var margin = {top: 40, right: 60, bottom: 30, left: 40};
var width = 400 - margin.left - margin.right;
var height = 200 - margin.top - margin.bottom;

// load data and check error
d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;
    document.body.appendChild(xml.documentElement);

    return test()
    // var svg = d3.select(".map")
    // console.log(svg)
    // svgContainer = svg.selectAll(".land").style("fill", "red")
    // .on("mouseover", onHoverProv)
    // .on("mouseout", outHoverProv)
    // .on("click", onClickProv);

// iterate through all `path` tags
});
function test(){
  var svg = d3.select(".map")
  console.log(svg)
  svgContainer = svg.selectAll(".land").style("fill", "red")
  .on("mouseover", onHoverProv)
  .on("mouseout", outHoverProv)
  .on("click", onClickProv);
}
function onClickProv() {
  d3.select(this).style("fill", "green").attr("class", "select");
  var json = d3.select(this).id

  var str = d3.select(this).attr('id')
  var load = str + ".json"
  // if load == "NL-FR":
  //   al
  drawdata(load)
}

function onHoverProv() {

  d3.select(this).style("fill", "blue")
  // var tooltip = d3.select('body').append('div')
  //     .text("hoi")
  //     .attr('class', 'hidden tooltip');
  //
  // var mouse = d3.mouse
  //
  // tooltip.classed('hidden', false)
  //     .attr('style', 'left:' + (mouse[0] + 15) +
  //             'px; top:' + (mouse[1] - 35) + 'px')

}
function outHoverProv() {
  d3.select(".tooltip").attr("")
  d3.selectAll(".land").style("fill", "red");
}


window.onload = function(){
   // define the scales and tell D3 how to draw the line

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
    .x(function(d) { return x(d.year); })
    .y(function(d) { return y(d.population); })

  const chart = d3.select('.chart').append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // define tooltip
  const tooltip = d3.select('#tooltip');
  const tooltipLine = chart.append('line');

  // add the axes and a title
  const xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(4);
  const yAxis = d3.svg.axis().scale(y).orient("left").ticks(4);
  chart.append('g').call(yAxis);
  chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
  chart.append('text').html('verkeersdoden per leeftijds catogorie per 5 jaar').attr('x', 200);

  // load the initial data and draw the lines
  let catagory, tipBox;
      d3.json("data1.json", function(error, d) {
          if (error) alert ("no data");
          console.log(d);
          catagory = d;
          drawfunction(catagory);
      });

    // draw graph
    function drawfunction(catagory){
        // select data and draw line
        chart.selectAll()
          .data(catagory).enter()
          .append('path')
          .attr("id","line")
          .attr('fill', 'none')
          .attr('stroke', d => d.color)
          .attr('stroke-width', 2)
          .datum(d => d.history)
          .attr('d', line);

        // select data and make text
        chart.selectAll()
          .data(catagory).enter()
          .append('text')
          .html(d => d.name)
          .attr("id","text")
          .attr('fill', d => d.color)
          .attr('alignment-baseline', 'middle')
          .attr('x', width)
          .attr('dx', '.5em')
          .attr('y', d => y(d.currentPopulation));

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


function drawdata(str){

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

  const line = d3.svg.line().x(d => x(d.year)).y(d => y(d.population));

  const chart = d3.select('.chart').append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // define tooltip
  const tooltip = d3.select('#tooltip');
  const tooltipLine = chart.append('line');

  // add the axes and a title
  const xAxis = d3.svg.axis(x).tickFormat(d3.format('.4'));
  const yAxis = d3.svg.axis(y).tickFormat(d3.format('.2s'));

  d3.selectAll("path#line").remove();
  d3.selectAll("text#text").remove();

  d3.json(str, function(error, d) {
      if (error) alert("nodata");
      console.log(d);
      catagory = d;
      drawfunction(catagory);
  });

// draw graph
function drawfunction(catagory){
    // select data and draw line
    chart.selectAll()
      .data(catagory).enter()
      .append('path')
      .attr("id","line")
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2)
      .datum(d => d.history)
      .attr('d', line);

    // select data and make text
    chart.selectAll()
      .data(catagory).enter()
      .append('text')
      .html(d => d.name)
      .attr("id","text")
      .attr('fill', d => d.color)
      .attr('alignment-baseline', 'middle')
      .attr('x', width)
      .attr('dx', '.5em')
      .attr('y', d => y(d.currentPopulation));

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


    // var svgContainer = d3.select("svg").append("svg")

    // var rectangle = svgContainer.append("rect")
    //     .attr("x", 13)
    //     .attr("y", 138.7)
    //     .attr("width", 21)
    //     .attr("height", 29)
    //     .style("fill", colors[3])
    //     .style("stroke", "#020203")
    //     .style("stroke-miterlimit", 10);

        // fill:#FFFFFF;stroke:#020203;stroke-miterlimit:10;

//     var svg = d3.select("rect").append("svg")
//         .attr("width", 21)
//         .attr("height", 29)

//          id="kleur1" x="13" y="13.5" class="st1" width="21" height="29"

//     var svg = d3.select("tekst1");
//     svg.append("g")
//     .text("1234");
