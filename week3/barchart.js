// d3 tip from "http://bl.ocks.org/Caged/6476579"
// make bar from "https://bost.ocks.org/mike/bar/3/" and "http://bl.ocks.org/Jverma/887877fc5c2c2d99be10"


window.onload = function(){
    // set the margins and the width and hight
    var margin = {top: 40, right: 20, bottom: 100, left: 40},
        width = 700 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    // define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(15);

    // define the tip
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d) {
        return "<strong>Liter:</strong> <span style='color:black'>" + d.Liter + "</span>";
      });


    // add the SVG element
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // call tip
    svg.call(tip);

    // load the data
    d3.json("Beer.json", function(error, data) {

        data.forEach(function(d) {
            d.Country = d.Country;
            d.Liter = +d.Liter;
        });

      // scale the range of the data
      x.domain(data.map(function(d) { return d.Country; }));
      y.domain([0, d3.max(data, function(d) { return d.Liter; })]);


      // add axis
      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-60)" );

    // make the y as
      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 5)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .style("font-size", "12px")
          .text("Liter / inwoner");


      // Add bar chart
      svg.selectAll("bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.Country); })
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.Liter); })
          .attr("height", function(d) { return height - y(d.Liter);})
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide);

      svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("gedronken bier per inwoner per land in de EU (in liters)");
    });
};