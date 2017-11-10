// David Vesseur 10901272 Linegraph with javascript
// this program makes a 2D graph based on the data given in a html file
// http://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi

// make arrays
var date = [];
var temp = [];
var dates = [];
var months = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep",
              "Okt", "Nov", "Dec"];

// make variables
var days = 365;
var amountmonths = 12;
var mintemp = null;
var maxtemp = null;

// set the placements of the graph
setHiPixel = [20, 200];
setWiPixel = [100, 400];


function createTransform(domain, range){
	// domain is a two-element array of the data bounds [domain_min, domain_max]
	// range is a two-element array of the screen bounds [range_min, range_max]
	// this gives you two equations to solve:
	// range_min = alpha * domain_min + beta
	// range_max = alpha * domain_max + beta
 		// a solution would be:

    var domain_min = domain[0];
    var domain_max = domain[1];
    var range_min = range[0];
    var range_max = range[1];

    // formulas to calculate the alpha and the beta
   	var alpha = (range_max - range_min) / (domain_max - domain_min);
    var beta = range_max - alpha * domain_max;

    // returns the function for the linear transformation (y= a * x + b)
    return function(x){
      return alpha * x + beta;
    };
}

function drawGraph(hightPixel, withPixel){

    // get delta of hight and width
    deltaWith = withPixel[1] - withPixel[0];
    deltaHight = hightPixel[1] - hightPixel[0];

    // make array's with min and max temprature and dates
    minmaxtemp = [mintemp, maxtemp];
    minmaxdate = [dates[0].getTime(), dates[364].getTime()];

    // use createTransform to get a function to set pixels
    var datetrans = createTransform(minmaxdate,withPixel);
    var temptrans = createTransform(minmaxtemp,hightPixel);

    // define canvas and ctx and make with and hight the given pixels,
    // add a little for title and axis discriptions
    var canvas = document.getElementById('canvas');
    canvas.width  = withPixel[1] + 120;
    canvas.height = hightPixel[1] + 20;
    var ctx = canvas.getContext('2d');

    // draw the graph line with all data points
    ctx.beginPath();
    for (i = 0; i < 365; i++){
        ctx.lineTo(datetrans(dates[i].getTime()),hightPixel[1] -
        temptrans(temp[i]) + hightPixel[0] );
    }

    // draw y-as line
    ctx.moveTo(withPixel[0], hightPixel[0]);
    ctx.lineTo(withPixel[0], hightPixel[1]);
    ctx.stroke();



    // draw tempratures
    for (i=0; i < 11; i++){

        // draw indicators
        ctx.moveTo(withPixel[0] - 5, hightPixel[1] + (i) * (hightPixel[0] -
        hightPixel[1]) / 10);
        ctx.lineTo(withPixel[0], hightPixel[1] + (i) * (hightPixel[0] -
        hightPixel[1]) / 10);

        // write tempratures next to indicators
        if (deltaHight < 80){
            ctx.font ='5px serif';
        }
        else{
            ctx.font ='10px serif';
        }
        ctx.font ='10px serif';
        ctx.fillText(parseInt(mintemp) + i * (parseInt((maxtemp - mintemp) /
        10)), withPixel[0] - 20, hightPixel[1] - (((hightPixel[1] -
        hightPixel[0]) / 10) * i));


    }

    // draw x-as
    ctx.moveTo(withPixel[0], hightPixel[1]);
    ctx.lineTo(withPixel[1], hightPixel[1]);

    // write the months on the x-as
    for (i=0; i < 12; i++){

        // draw the indicators for x-as
        ctx.moveTo(withPixel[0] + (i) * (withPixel[1] - withPixel[0]) / 12,
        hightPixel[1] + 5);
        ctx.lineTo(withPixel[0] + (i) * (withPixel[1] - withPixel[0]) / 12,
        hightPixel[1]);

        // write the months
        if (deltaWith < 150){
            ctx.font ='5px serif';
        }
        else{
            ctx.font ='10px serif';
        }
        ctx.fillText(months[(parseInt(datadate.substring(4, 6)) + i) % 12],
        withPixel[0] + ((withPixel[1] - withPixel[0]) / 12) * i, hightPixel[1]
        + 20);
    }

    // write title of graph
    var title = "graph represting tempratures of The Bild ("+
                dates[0].getFullYear() + "/" + (dates[0].getMonth() + 1) + "/"
                + (dates[0].getDay() - 1) + " - " +
                dates[days - 1].getFullYear() + "/" +
                (dates[days - 1].getMonth() + 2)+ "/" +
                (dates[days - 1].getDay() - 1) + ")";
    if (deltaWith < 150){
            ctx.font ='7px serif';
        }
    else{
        ctx.font ='15px serif';
        }
    ctx.fillText(title, withPixel[0] + 5,hightPixel[0] - 5);
    ctx.stroke();
}

// wait for loading before executing code
window.onload = function() {

    // change the csv to strings seperated by "\n"
    var data = document.getElementById("rawdata").innerHTML.split("\n");

    // for the days get the separete date and temprature
    for(i = 0; i < days ; i++){
        var data2 = data[i].split(",");

        // get date and temp separate out of string and remove spaces
        datatemp = parseInt(data2[1].trim());
        datadate = data2[0].trim();

        // push data into array
        date.push(datadate);
        temp.push(datatemp);

        // change dates from csv to java dates and add to array
        year = datadate.substring(0, 4);
        month = datadate.substring(4, 6);
        day = datadate.substring(6);
        var mydate = new Date(year, month - 1, day);
        dates.push(mydate);

        // if new temprature is lower and remember it
        if (datatemp < mintemp){
            mintemp = datatemp;
        }
        // if new temprature is higher and remember it
        if (datatemp > maxtemp){
            maxtemp = datatemp;
        }
    }

    // call function to draw the graph
    drawGraph(setHiPixel, setWiPixel);
};
