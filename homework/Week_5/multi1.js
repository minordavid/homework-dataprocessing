// David Vesseur 10901272
// https://www.w3schools.com/howto/howto_js_dropdown.asp

// Define margins, dimensions, and some line colors
var margin = {top: 40, right: 120, bottom: 30, left: 40};
var width = 800 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
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

  // load the initial data and draw the lines
  let states, tipBox;
      d3.json("state-populations.json", d => {

        states = d;
        drawfunction(states);
      });

  // load the chosen data
  d3.selectAll(".m")
		.on("click", function() {
			var date = this.getAttribute("value");

      // set the chosen data set al str
			var str;
			if(date == "1"){
				str = "state-populations.json";
			}else if(date == "2"){
				str = "state-populations2.json";
			}

      // Load the data and draw the lines
      let states;
      d3.json(str, d => {

        states = d;
        drawfunction(states);
      });
		});

  // Define the scales and tell D3 how to draw the line
  var x = d3.scaleLinear().domain([1910, 2010]).range([0, width]);
  var y = d3.scaleLinear().domain([0, 40000000]).range([height, 0]);
  var line = d3.line().x(d => x(d.year)).y(d => y(d.population));

  var chart = d3.select('svg').append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  var tooltip = d3.select('#tooltip');
  var tooltipLine = chart.append('line');

  // Add the axes and a title
  var xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
  var yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));
  chart.append('g').call(yAxis);
  chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
  chart.append('text').html('State Population Over Time').attr('x', 200);




    function removeTooltip() {
      if (tooltip) tooltip.style('display', 'none');
      if (tooltipLine) tooltipLine.attr('stroke', 'none');
    }

    function drawTooltip() {
      var year = Math.floor((x.invert(d3.mouse(tipBox.node())[0]) + 5) / 10) * 10;

      states.sort((a, b) => {
        return b.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
      });

      tooltipLine.attr('stroke', 'black')
        .attr('x1', x(year))
        .attr('x2', x(year))
        .attr('y1', 0)
        .attr('y2', height);

      tooltip.html(year)
        .style('display', 'block')
        .style('left', d3.event.pageX + 20)
        .style('top', d3.event.pageY - 20)
        .selectAll()
        .data(states).enter()
        .append('div')
        .style('color', d => d.color)
        .html(d => d.name + ': ' + d.history.find(h => h.year == year).population);
    }

    function drawfunction(states){
        chart.selectAll()
          .data(states).enter()
          .append('path')
          .attr('fill', 'none')
          .attr('stroke', d => d.color)
          .attr('stroke-width', 2)
          .datum(d => d.history)
          .attr('d', line);

        chart.selectAll()
          .data(states).enter()
          .append('text')
          .html(d => d.name)
          .attr('fill', d => d.color)
          .attr('alignment-baseline', 'middle')
          .attr('x', width)
          .attr('dx', '.5em')
          .attr('y', d => y(d.currentPopulation));

        tipBox = chart.append('rect')
          .attr('width', width)
          .attr('height', height)
          .attr('opacity', 0)
          .on('mousemove', drawTooltip)
          .on('mouseout', removeTooltip);
    }
};
