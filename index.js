const svg = d3.select("svg"),
            margin = 100,
            width = svg.attr("width") - margin,
            height = svg.attr("height") - margin


async function init1(myYear) {

  var x = d3.scaleBand()
             .domain([2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019]).range ([0, width/2-15]);
  var y = d3.scaleLinear()
            .domain([4.0,4.8]).range ([200,0]);
  var cols = d3.scaleLinear()
          .domain([4.5,4.8]).range(['blue','RED']);
  const data1 = await d3.csv('https://raw.githubusercontent.com/mz4987/mz4987.github.io/main/2009-2019');

d3.select('svg')
  .append('g').attr("transform", "translate(" + 50 + "," + 50 + ")")
  .selectAll('rect')
  .data(data1)
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.Year); })
  .attr("y", function(d) { return y(d.User_Rating); })
  .attr("width", x.bandwidth()-2)
  .attr("height", function(d) { return height - 300- y(d.User_Rating); })
  .style("fill", function(d,i) { return cols(d.User_Rating); });

  var y_axis = d3.axisLeft(y).tickValues([4.2,4.4,4.5,4.6,4.8]);
  d3.select("svg").append("g").attr("transform", "translate(" + 50 + "," + 50 + ")").call(y_axis);

  var x_axis = d3.axisBottom(x);
  d3.select("svg").append("g").attr("transform", "translate(" + 50 + "," +(height - 250)+ ")").call(x_axis);


  var x = d3.scaleBand()
             .domain([2009,2010,2011,2012,2013,2014,2015,2016,2017,2018,2019]).range ([width/2+15, width]);
  var y = d3.scaleLinear()
            .domain([5.0,16.0]).range ([200,0]);
  var cols = d3.scaleLinear()
          .domain([10.0,20.0]).range(['blue','RED']);


d3.select('svg')
  .append('g').attr("transform", "translate(" + (50)+"," + 50 + ")")
  .selectAll('rect')
  .data(data1)
  .enter()
  .append("rect")
  .attr("x", function(d) { return x(d.Year); })
  .attr("y", function(d) { return y(d.Price); })
  .attr("width", x.bandwidth()-2)
  .attr("height", function(d) { return height - 300- y(d.Price); })
  .style("fill", function(d,i) { return cols(d.Price); });

  var y_axis = d3.axisLeft(y).tickValues([6,8,10,12,14,16]);
  d3.select("svg").append("g").attr("transform", "translate(" + (50 + width/2+15)+ "," + 50 + ")").call(y_axis);

  var x_axis = d3.axisBottom(x);
  d3.select("svg").append("g").attr("transform", "translate(" + 50 + "," +(height - 250)+ ")").call(x_axis);
  };



  async function init2(theYear){
  const data2 = await d3.csv('https://raw.githubusercontent.com/mz4987/mz4987.github.io/main/bestsellers%20with%20categories.csv');
  var x = d3.scaleLog().domain([200,90000]).range ([0, width]);
  var y = d3.scaleLinear().domain([3.0,5.0]).range ([200,0]);
  var cols = d3.scaleLinear()
          .domain([5.0,30.0,60.0]).range(['blue','orange','red']);

   var ttip = d3.select("#my_dataviz")
                   .append("div")
                   .style("opacity", 0)
                   .attr("class", "tooltip")
                   .style("background-color", "white")
                   .style('position', 'absolute');


    var mouseover = function(d) {
    tooltip
      .style("opacity", 1)
  };

    var mousemove = function(d) {
    tooltip
      .html(d.Name  + d.Author )

  };

  // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
  var mouseleave = function(d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0);
  };

  d3.select('svg')
  .append('g').attr("transform", "translate(" + 50 + "," + 350 + ")")
  .selectAll('circle')
  .data(data2.filter(function(d,i){return d.Year==theYear}))
  .enter()
  .append('circle')
  .attr('cx', function(d,i) {  return x(d.Reviews);})
  .attr('cy', function(d,i) { return y(d.User_Rating); })
  .attr('r', function(d,i) { return d.Price/10+5; })
  .style("fill", function(d,i) { return cols(d.Price); })
  .style("opacity", 0.7)
  .style("stroke", "black")
  .on('mouseover', function(e, d) {
          ttip.transition()
              .duration(500)
              .style('opacity', .9);
          ttip .html(d.Name + '<br>' + 'Author: '+ d.Author)
              .style('left', (event.pageX) + 'px')
              .style('top', (event.pageY - 30) +           'px')
              .attr('data-year', d.Year);
        })
        .on('mouseout', function(d) {
          ttip.transition()
            .duration(300)
            .style('opacity', 0);
        });

  var y_axis = d3.axisLeft(y).tickValues([3.0,3.2,3.4,3.6,3.8,4.0, 4.2, 4.4, 4.6, 4.8,5.0]);
  d3.select("svg").append("g").attr("transform", "translate(" + 50 + "," + 350 + ")").call(y_axis);

  var x_axis = d3.axisBottom(x);
  d3.select("svg").append("g").attr("transform", "translate(" + 50 + "," +(height+50)+ ")").call(x_axis);

   };

init1(2010);
init2(2010);

