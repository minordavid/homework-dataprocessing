// David vesseur 10901272
// java script used to make a scaterplot using three data points

window.onload = function(){

    //create size of the table and give margins
    var margin = { top: 50, right: 100, bottom: 40, left: 50 };
    var width = 960 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;

    //select body and add a svg with the given hights
    var svg = d3.select("body")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // give the range for x axis
    var xscale = d3.scaleLinear()
      .range([0,width]);

    // give range for y axis
    var yscale = d3.scaleLinear()
      .range([height,0]);

    // set radius for smallest and biggest dots on scatterplot
    var radius = d3.scaleSqrt()
      .range([2,18]);

    // create x axis
    var xAxis = d3.axisBottom()
      .tickSize(-height)
      .scale(xscale);

    // create yaxis
    var yAxis = d3.axisLeft()
      .tickSize(-width)
      .scale(yscale);

    // set the d3.scaleCategory20 as a variable, this is used to give a nice diversity of colors
    var color = d3.scaleCategory20();

    // load data of csv and check for error
    d3.csv("Baseball.csv", function(error, data) {
      if (error) throw error;
      console.log(data);

      // data pre-processing
      data.forEach(function(d) {
        d.y = +d["beer"];
        d.x = +d["cost"];
        d.r = +d["happiness"];
      });

      data.sort(function(a,b) { return b.r - a.r; });

      // transform the x axis range
      xscale.domain(d3.extent(data, function(d) {
        return d.x;
      })).nice();

      // transform the y axis range
      yscale.domain(d3.extent(data, function(d) {
        return d.y;
      })).nice();

      // transform the radius
      radius.domain(d3.extent(data, function(d) {
        return d.r;
      })).nice();

      // append group and make xaxis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .attr("class", "x axis")
        .call(xAxis);

      // append group and make yaxis
      svg.append("g")
        .attr("transform", "translate(0,0)")
        .attr("class", "y axis")
        .call(yAxis);

      // make the bubble
      var group = svg.selectAll("g.bubble")
        .data(data)
        .enter().append("a")
        .attr("xlink:href", "https://www.youtube.com/watch?v=dQw4w9WgXcQ")
        .append("g")
        .attr("class", "bubble")
        .attr("transform", function(d) {
          return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")";
        });

      // place the dots on the scatterplot with right color and size
      group
        .append("circle")
        .attr("r", function(d) { return radius(d.r);  })
        .style("fill", function(d) {
          return color(d["land"]);
        });

      // show country and the happiness
      group
        .append("text")
        .attr("x", function(d) { return radius(d.r); })
        .attr("alignment-baseline", "middle")
        .text(function(d) {
          return d["land"] + ", geluk: " + d["happiness"] + " / 10";
        });


    // add label to y axis
      svg.append("text")
        .attr("y", -40)
        .attr("transform", "rotate(-90)")
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .style("font-size", "12px")
        .text("Liter bier per inwoner (per jaar)");

        // add label to x axis
      svg.append("text")
        .attr("x", width)
        .attr("y", height + 30)
        .attr("text-anchor", "end")
        .attr("class", "label")
        .text("prijs per biertje (euro)");

        // add title
      svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("Geluk in een land ten opzichte van de prijs van bier en de gedronken hoeveelheid");

      // create the legend
      var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(2," + i * 14 + ")"; });

        // make the squere representing the color
      legend.append("rect")
          .attr("x", width)
          .attr("width", 12)
          .attr("height", 12)
          .style("fill", color);

        // add the names of the countries to the legend next to the color
      legend.append("text")
          .attr("x", width + 16)
          .attr("y", 6)
          .attr("dy", ".35em")
          .style("text-anchor", "start")
          .text(function(d) { return d; });

      // make the dots that don't match the country vade
      legend.on("mouseover", function(type) {
          d3.selectAll(".legend")
            .style("opacity", 0.1);
          d3.select(this)
            .style("opacity", 1);
          d3.selectAll(".bubble")
            .style("opacity", 0.1)
            .filter(function(d) { return d["land"] == type; })
            .style("opacity", 1);
        })
        .on("mouseout", function(type) {
          d3.selectAll(".legend")
            .style("opacity", 1);
          d3.selectAll(".bubble")
            .style("opacity", 1);
        });
    });
};