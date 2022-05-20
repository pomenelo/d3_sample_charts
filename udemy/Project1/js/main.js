/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 2 - Gapminder Clone
*/

const MARGIN = { LEFT: 100, RIGHT: 10, TOP: 10, BOTTOM: 130 }
const WIDTH = 600 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 400 - MARGIN.TOP - MARGIN.BOTTOM


const svg = d3.select("#chart-area").append("svg")
  .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
  .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
  .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

let time = 0

// tooltip 
const tip = d3.tip()
  .attr('class', 'd3-tip')
  .html(d => d)
g.call(tip)

//create sccales

const x = d3.scaleLog()
  .domain([142, 150000])
  .range([0, WIDTH]);
const y = d3.scaleLinear()
	.range([HEIGHT, 0])
	.domain([0, 90])
const area = d3.scaleLinear()
	.range([25*Math.PI, 1500*Math.PI])
	.domain([2000, 1400000000])
const continentColor = d3.scaleOrdinal(d3.schemePastel1)

// draw x axis 
const xAxisCall = d3.axisBottom(x)
  .tickValues([400, 4000, 40000])
  .tickFormat(d3.format("$"));
 g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${HEIGHT})`)
  .call(xAxisCall)

// draw y axis
const yAxisCall = d3.axisLeft(y)
g.append("g")
  .attr("class", "y axis")
  .call(yAxisCall)

// x axis label
const xAxisLabel = g.append("text")
.attr("x", WIDTH/ 2)
.attr("y", HEIGHT + 40)
.style("font-size", "10px")
.attr("text-anchor", "middle")
.text("GDP Per Capita ($)")
// y axis label
const yAxisLabel = g.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", -40)
   .attr("x", -140 )
   .style("font-size", "10px")
   .attr("text-anchor", "middle")
   .text("Life Expectancy (Years)")
const timeLabel = g.append("text")
   .attr("y", HEIGHT - 10)
   .attr("x", WIDTH - 40)
   .attr("font-size", "40px")
   .attr("opacity", "0.4")
   .attr("text-anchor", "middle")
   .text("1800")

const continents = ["europe", "asia", "americas", "africs"]
  
const legend = g.append("g")
  .attr("transform", `translate(${WIDTH - 10}, ${HEIGHT - 125})`)

continents.forEach((continent, i) => {
  const legendRow = legend.append("g")
  .attr("transform", `translate(0, ${i*20})`)

  legendRow.append("rect")
    .attr("width", 10)
    .attr("height", 10)
    .attr("fill", continentColor(continent))
  legendRow.append("text")
    .attr("x", -10)
    .attr("y", 10)
    .attr("text-anchor", "end")
    .style("text-transform", "capitalize")
    .text(continent)
})


   d3.json("data/data.json").then(function(data){
    // clean data
    const formattedData = data.map(year => {
      return year["countries"].filter(country => {
        const dataExists = (country.income && country.life_exp)
        return dataExists
      }).map(country => {
        country.income = Number(country.income)
        country.life_exp = Number(country.life_exp)
        return country
      })
    })

	// run the code every 0.1 second
	d3.interval(function(){
		// at the end of our data, loop back
		time = (time < 214) ? time + 1 : 0
		update(formattedData[time])
	}, 100)

	// first run of the visualization
	update(formattedData[0])
})

function update(data) {
	// standard transition time for the visualization
	const t = d3.transition()
		.duration(100)

	// JOIN new data with old elements.
	const circles = g.selectAll("circle")
		.data(data, d => d.country)

	// EXIT old elements not present in new data.
	circles.exit().remove()

	// ENTER new elements present in new data.
	circles.enter().append("circle")
		.attr("fill", d => continentColor(d.continent))
    .on("mouseover", tip.show)
    .on("mouseout", tip.hide)
		.merge(circles)
		.transition(t)
			.attr("cy", d => y(d.life_exp))
			.attr("cx", d => x(d.income))
			.attr("r", d => Math.sqrt(area(d.population) / Math.PI))

	// update the time label
	timeLabel.text(String(time + 1800))
}
