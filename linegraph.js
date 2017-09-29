
// data = [{
//     "sale": "202",
//     "year": "2000"
// }, {
//     "sale": "215",
//     "year": "2001"
// }, {
//     "sale": "179",
//     "year": "2002"
// }, {
//     "sale": "199",
//     "year": "2003"
// }, {
//     "sale": "134",
//     "year": "2003"
// }, {
//     "sale": "176",
//     "year": "2006"
// }];
data = [{
    "sale": "152",
    "year": "2000"
}, {
    "sale": "550",
    "year": "2001"
}, {
    "sale": "420",
    "year": "2002"
}, {
    "sale": "300",
    "year": "2003"
}, {
    "sale": "280",
    "year": "2004"
}, {
    "sale": "476",
    "year": "2006"
}];
var data2 = [{
    "sale": "196",
    "year": "2000"
}, {
    "sale": "534",
    "year": "2001"
}, {
    "sale": "446",
    "year": "2002"
}, {
    "sale": "274",
    "year": "2003"
}, {
    "sale": "303",
    "year": "2004"
}, {
    "sale": "490",
    "year": "2006"
}];

var vis = d3.select("#visualisation"),
WIDTH = 500,
HEIGHT = 250,
MARGINS = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 50
},

xScale = d3.scaleLinear()
    .range([MARGINS.left, WIDTH - MARGINS.right])
    .domain([2000, 2006]),

yScale = d3.scaleLinear()
    .range([HEIGHT - MARGINS.top, MARGINS.bottom])
    .domain([0, 600]),

xAxis = d3.axisBottom()
    .scale(xScale)
    .ticks(5);




vis.append("svg:g")
.attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
.call(xAxis);



yAxis = d3.axisLeft()
.scale(yScale)
.ticks(3)


vis.append("svg:g")
.attr("transform", "translate(" + (MARGINS.left) + ",0)")
.call(yAxis);

vis.append("text")      // text label for the x axis
.attr("x", 250 )
.attr("y",  280 )
.style("text-anchor", "middle")
.text("Date");

vis.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0)
.attr("x",-100)
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Value");    


var lineGen = d3.line()
.x(function (d) {
    return xScale(d.year);
})
.y(function (d) {
    return yScale(d.sale);
})
.curve(d3.curveBasis);
//.interpolate("basis");

vis.append('svg:path')
.attr('d', lineGen(data))
.attr('stroke', 'green')
.attr('stroke-width', 1)
.attr('fill', 'none');
vis.append('svg:path')
.attr('d', lineGen(data2))
.attr('stroke', 'blue')
.attr('stroke-width', 2)
.attr('fill', 'none');
// vis.append('svg:path')
// .attr('d', lineGen(data3))
// .attr('stroke', 'red')
// .attr('stroke-width', 2)
// .attr('fill', 'none');