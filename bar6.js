var parseDate=d3.timeParse("%d-%m-%Y");
d3.csv("covid-cases-increase-decrease.csv")
	.row(function(d) {return {date:parseDate(d.date),val:Number(d.val.trim())};})
	.get(function(error,data){
		console.log(data);
	var height=400;
	var width=1000;

	var maxDate=d3.max(data,function(d){return d.date;});
	var minDate=d3.min(data,function(d){return d.date;});
	var maxValue=d3.max(data,function(d){return d.val;});

	var y=d3.scaleLinear()
			.domain([0,maxValue])
			.range([height,80]);
	var x=d3.scaleTime()
			.domain([minDate,maxDate])
			.range([200,width]);
	var yAxis=d3.axisLeft(y);
	var xAxis=d3.axisBottom(x);	
	var svg=d3.select('body').append('svg')
			.attr('height','100%')
			.attr('width','100%');
	var tooltip = d3.select("body").append("div").attr("class", "toolTip");

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width-350)
    .attr("y", height +60)
    .text("Months");

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x",-80)
    .attr("y",120)
    .attr("dy", "1.50em")
    .attr("transform", "rotate(-90)")
    .text("No. of Confirmed Covid-19 Cases per Month");

svg.selectAll(".bar")
         .data(data)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return x(d.date); })
         .attr("y", function(d) { return y(d.val); })
         .attr("width", 2)

         .attr("height", function(d) { return height - y(d.val); })

 .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html("Date:"+(d.date) + "<br>" + "Number of Cases: " + (d.val));
        })
    		.on("mouseout", function(d){ tooltip.style("display", "none");});


         ;
var chartGroup=svg.append('g')
					.attr('transform','translate(200,00)');

chartGroup.append('g').attr('class','x axis').attr('transform','translate(-200,'+height+')').call(xAxis);
	chartGroup.append('g').attr('class','y axis').call(yAxis);	





	/*var line=d3.line()
			.x(function(d){return x(d.date);})
			.y(function(d){return y(d.val);});	
console.log(data);
	chartGroup.append('path').attr('d',line(data));
	chartGroup.append('g').attr('class','x axis').attr('transform','translate(0,'+height+')').call(xAxis);
	chartGroup.append('g').attr('class','y axis').call(yAxis);	
	console.log(data);						*/				
	});