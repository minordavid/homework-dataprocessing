// David Vesseur 10901272
//

// define margins, dimensions, and some line colors
var margin = {top: 40, right: 120, bottom: 30, left: 40};
var width = 800 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

// When the user clicks on the button,
// toggle between hiding and showing the dropdown content
// https://www.w3schools.com/howto/howto_js_dropdown.asp
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};


window.onload = function(){
   // define the scales and tell D3 how to draw the line

  const x = d3.scalePoint()
    .domain([1995, 2000, 2005, 2010, 2015])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, 60])
    .range([height, 0]);

  // make linear scale const z to use for cross hair positioning
  const z = d3.scaleLinear()
    .domain([1995, 2015])
    .range([0, width]);

  const line = d3.line().x(d => x(d.year)).y(d => y(d.population));

  const chart = d3.select('svg').append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // define tooltip
  const tooltip = d3.select('#tooltip');
  const tooltipLine = chart.append('line');

  // add the axes and a title
  const xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
  const yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));
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


  // load the chosen data
  d3.selectAll(".m")
		.on("click", function() {
			var date = this.getAttribute("value");

      // remove old text and lines
      d3.selectAll("path#line").remove();
      d3.selectAll("text#text").remove();

      // set the chosen data set al str
			var str;
			if(date == "1"){
				str = "data1.json";
			}else if(date == "2"){
				str = "data2.json";
			}else if(date == "3"){
				str = "data3.json";
			}

      // Load the data and draw the lines
      let catagory;
      d3.json(str, function(error, d) {
          if (error) alert("nodata");
          console.log(d);
          catagory = d;
          drawfunction(catagory);
      });
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
