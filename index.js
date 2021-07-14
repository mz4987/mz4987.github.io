const svg = d3.select("svg"),
            margin = 100,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin


  var x = d3.scaleLog().domain([10,150]).range ([0, 200]);
  var y = d3.scaleLog().domain([10,150]).range ([200,0]);

  const data = d3.csv("https://flunky.github.io/cars2017.csv");

d3.select('svg')
  .append('g').attr("transform", "translate(" + 50 + "," + 50 + ")")
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('cx', function(d,i) {  return x(d.AverageCityMPG);})
  .attr('cy', function(d,i) { return y(d.AverageHighwayMPG); })
  .attr('r', function(d,i) { if (d.EngineCylinders ==0) {return 2;}
                              return d.EngineCylinders*(1+2/d.EngineCylinders); });

  var y_axis = d3.axisLeft(y).tickValues([10, 20, 50, 100])
                 .tickFormat(d3.format("~s"));
  d3.select("svg").append("g").attr("transform", "translate(" + 50 + "," + 50 + ")").call(y_axis);

  var x_axis = d3.axisBottom(x).tickValues([10, 20, 50, 100])
                 .tickFormat(d3.format("~s"));
  d3.select("svg").append("g").attr("transform", "translate(" + 50 + "," +(height + 50)+ ")").call(x_axis);