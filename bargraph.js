// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 40 },
width = 500 - margin.left - margin.right, //900
height = 300 - margin.top - margin.bottom; //450

// set the ranges
var x = d3.scaleBand()
.range([0, width])
.paddingInner(0.1);
var y = d3.scaleLinear()
.range([height, 0]);

// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#bar").append("svg")
.attr("width", 500) //960
.attr("height", 350) //500
.append("g")
.attr("transform",
"translate(30 , 30)");

//Giving label toi the axis
svg.append("text")      // text label for the x axis
.attr("x", 200 )
.attr("y",  280 )
.style("text-anchor", "middle")
.text("Date");

svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x",0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Value");    

// get the data
d3.json("pi.json", function (error, data) {
if (error) throw error;

// format the data
data.forEach(function (d) {
    d.age = +d.age;
});

// Scale the range of the data in the domains
x.domain(data.map(function (d) { return d.name; }));
y.domain([0, d3.max(data, function (d) { return d.age; })]);

// append the rectangles for the bar chart
svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function (d, i) { return i * 40 })
    .attr("width", 30)
    .attr("y", function (d) { return y(d.age); })
    .attr("height", function (d) { return height - y(d.age); });



// add the x Axis
svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));


// add the y Axis
svg.append("g")
    .call(d3.axisLeft(y));


});