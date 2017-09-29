var vis = d3.select("#visualisation1"),
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
    .ticks(5)
    .scale(xScale);




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
.attr("y",  0)
.attr("x", -125)
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

vis.append('svg:path')
.attr('d', lineGen(data))
.attr('stroke', 'green')
.attr('stroke-width', 1)
.attr('fill', 'none');