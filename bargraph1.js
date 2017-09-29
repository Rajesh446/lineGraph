var x0 = d3.scaleBand()
.rangeRound([0, width])
.padding(0.1);

var x1 = d3.scaleBand();

var y = d3.scaleLinear()
.range([height, 0]);

var colorRange = d3.scaleOrdinal(d3.schemeCategory20);
var color = d3.scaleOrdinal()
.range(colorRange.range());

var xAxis = d3.axisBottom()
.scale(x0)
.ticks(0)

var yAxis = d3.axisLeft()
.scale(y)
.tickFormat(d3.format(".2s"));

var divTooltip = d3.select("body").append("div").attr("class", "toolTip");

d3.json("pi.json", function (error, dataset) {
var svg = d3.select("#bar1")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");


dataset = [
{label:"john", "Not Satisfied":20, "Not Much Satisfied":10, },
{label:"mike", "Not Satisfied":15, "Not Much Satisfied":30,},
{label:"mark", "Not Satisfied":15, "Not Much Satisfied":30,},
{label:"joe", "Not Satisfied":15, "Not Much Satisfied":30, },
{label:"nancy", "Not Satisfied":20, "Not Much Satisfied":10, },
{label:"ra", "Not Satisfied":15, "Not Much Satisfied":30,},
{label:"crysta", "Not Satisfied":15, "Not Much Satisfied":30, },
{label:"naina", "Not Satisfied":15, "Not Much Satisfied":30}
];

var options = d3.keys(dataset[0]).filter(function(key) { return (key !== "label"); });

dataset.forEach(function(d) {
d.valores = options.map(function(name) { return {name: name, value: +d[name]}; });
});

x0.domain(dataset.map(function(d) { return d.label; }));
x1.domain(options).rangeRound([0, x0.bandwidth()]);
y.domain([0, d3.max(dataset, function(d) { return d3.max(d.valores, function(d) { return d.value; }); })]);

svg.append("g")
.attr("class", "x-axis")
.attr("transform", "translate(0," + height + ")")
.attr("value","")
.call(xAxis);

svg.append("g")
.attr("class", "y axis")
.call(yAxis)
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", ".71em")
.style("text-anchor", "end")

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


var bar = svg.selectAll(".bar")
.data(dataset)
.enter().append("g")
.attr("class", "rect")
.attr("transform", function(d) { return "translate(" + x0(d.label) + ",0)"; });

bar.selectAll("rect")
.data(function(d) { return d.valores; })
.enter().append("rect")
.attr("width", x1.bandwidth())
.attr("x", function(d) { return x1(d.name); })
.attr("y", function(d) { return y(d.value); })
.attr("value", function(d){return d.name;})
.attr("height", function(d) { return height - y(d.value); })
.style("fill", function(d) { return color(d.name); });
});