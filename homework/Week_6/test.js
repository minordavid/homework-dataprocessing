

// load data and check error
d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;
    document.body.appendChild(xml.documentElement);

    var svg = d3.select("svg")

    // console.log("Friesland".toUpperCase().slice(0,2));
    // var coordinates = [0, 0];
    // coordinates = d3.mouse(this);
    // var x = coordinates[0];
    // var y = coordinates[1];


    svgContainer = svg.selectAll(".land").style("fill", "red")
    .on("mouseover", onHoverProv)
    .on("mouseout", outHoverProv)
    .on("click", onClickProv);

    


    // var tooltip = document.querySelector('.map-tooltip');

// iterate through all `path` tags
});
function onClickProv() {
  d3.select(this).style("fill", "green").attr("class", "select")
}

function onHoverProv() {

  d3.select(this).style("fill", "blue")
  var tooltip = d3.select('body').append('div')
      .text("hoi")
      .attr('class', 'hidden tooltip');

  var mouse = d3.mouse

  tooltip.classed('hidden', false)
      .attr('style', 'left:' + (mouse[0] + 15) +
              'px; top:' + (mouse[1] - 35) + 'px')



}
function outHoverProv() {
  d3.select(".tooltip").attr("")
  d3.selectAll(".land").style("fill", "red");
}

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
