// David vesseur 10901272
// make a legend using svg. ik heb er voor gekozen om alle oude figuren te verwijderen en deze in een loop
// toe te voegen omdat ik dit netter vind.

// make variables
name = ["kleur1", "kleur2", "kleur3", "kleur4", "kleur5", "kleur6"];
colors = ["#ccece6","#99d8c9","#66c2a4","#41ae76","#238b45","#005824"];
descriptions = ["never", "going", "to", "give", "you", "up"];

// load data and check error
d3.xml("test.svg", "image/svg+xml", function(error, xml) {
    if (error) throw error;
    document.body.appendChild(xml.documentElement);

    // loop in the length of colors
    for (i = 0; i < colors.length; i++){

        // create the left container with the colors
        var svgContainer = d3.select("svg").append("svg");
        svgContainer.append("rect")
        .attr("id", name[i])
        .attr("x", 13)
        .attr("y", 13.5 + (43.4) * i)
        .attr("width", 21)
        .attr("height", 29)
        .style("fill", colors[i])
        .style("stroke", "#020203")
        .style("stroke-miterlimit", 10);

        // create a group and append the right container
        var svgTContainer = d3.select("svg").append("g");
        svgTContainer.append("rect")
        .attr("x", 46.5)
        .attr("y", 13.5 + (43.4) * i)
        .attr("width", 119.1)
        .attr("height", 29)
        .style("fill", "#FFFFFF")
        .style("stroke", "#020203")
        .style("stroke-miterlimit", 10);

        // append the text
        svgTContainer.append("text")
        .attr("x", 50)
        .attr("y", 30.5 + (43.4) * i)
        .text(descriptions[i]);

    }
});

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


