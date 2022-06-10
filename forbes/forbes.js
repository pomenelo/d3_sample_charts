//Forbes companies bar chart 

//set up chart area
const MARGIN = { LEFT: 250, RIGHT: 10, TOP: 50, BOTTOM: 100 }
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT
const HEIGHT = 1100 - MARGIN.TOP - MARGIN.BOTTOM

let flag = true

const svg = d3.select("#chart-area").append("svg")
    .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

const g = svg.append("g")
    .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

// X label
g.append("text")
  .attr("class", "x axis-label")
  .attr("x", WIDTH / 2)
  .attr("y", HEIGHT + 50)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")

// Y label
const yLabel = g.append("text")
  .attr("class", "y axis-label")
  .attr("x", - (HEIGHT / 2))
  .attr("y", -200)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Company")


const x = d3.scaleLinear()
    .range([0, WIDTH])
  
const y = d3.scaleBand()
    .range([HEIGHT, 0])

const xAxisGroup = g.append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${HEIGHT})`)
  
const yAxisGroup = g.append("g")
    .attr("class", "y axis")

d3.csv("data/data_clean.csv").then(data => {
    data.forEach(d => {
    d.sales_usd_billion = Number(d.sales_usd_billion)
    d.profit_usd_billion = Number(d.profit_usd_billion)
})

d3.interval(() => {
    flag = !flag
    update(data)
}, 1000)

update(data)
})

function update(data) {
    const value = flag ? "sales_usd_billion" : "profit_usd_billion"
    const t = d3.transition().duration(750)

    x.domain([0, d3.max(data, d => d[value])])
    y.domain(data.map(d => d.company))

   
data.sort(function(a, b) {
    return  b.rank - a.rank;
  })

const xAxisCall = d3.axisBottom(x)
    .ticks(30)
    xAxisGroup.transition(t).call(xAxisCall)

const yAxisCall = d3.axisLeft(y)
    yAxisGroup.transition(t).call(yAxisCall)

//DATA JOIN - join new data w old elements
const rects = g.selectAll("rect")
    .data(data, d => d.month)

 //EXIT old elements not present in new data
 rects.exit()
.attr("fill", "red")
.transition(t)
  .attr("width", 0)
  .attr("x", x(0))
  .remove()


//enter new elements present in the new data 
 rects.enter().append("rect")
    .attr("y", d => y(d.company) +3)
    .attr("x", 0)
    .attr("width", d => x(d[value]))
    .attr("height", d => 4)

//enter new elements present in the new data 
rects.enter().append("rect")
    .attr("fill", "grey")
    .attr("x", x(0))
    .attr("width", 0)

//update old elements present in the data
  .merge(rects)
  .transition(t)
  .attr("y", d => y(d.company))
  .attr("height", x.bandwidth)
    .attr("x", d => y(d.revenue))
    .attr("width", d => x([d.value]))


    const text = flag ? "Sales ($, Billions)" : "Profit ($, Billions)"
    yLabel.text(text)
}

