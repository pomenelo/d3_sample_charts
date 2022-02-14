async function drawLineChart() {

// 1. Access data
const dataset = await d3.json("./data/nfts.csv")
    console.log(dataset[0])

const yAccessor = d => d.stats.market_cap
const dateParser = d3.timeParse("%Y-%m-%d")
const xAccessor = d => dateParser(d.created_date)

 // 2. Create chart dimensions
let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margins: {
        top: 15,
        right: 15,
        bottom: 40,
        left: 60,
    }
}
dimensions.boundedWidth = dimensions.width 
- dimensions.margins.left 
- dimensions.margins.right 
dimensions.boundedHeight = dimensions.height
- dimensions.margins.top
- dimensions.margins.bottom

const wrapper = d3.select("#wrapper")
.append("svg")
.attr("width", dimensions.width)
.attr("height", dimensions.height)

const bounds = wrapper.append("g")
.style("transform", `translate(${
    dimensions.margins.left
}px. ${
    dimensions.margins.top
}px)`)

//create scales
const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset,  yAccessor))
    .range([dimensions.boundedHeight, 0])


const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])

// draw data 
const lineGenerator = d3.line()
.x(d => xScale(xAccessor(d)))
.y(d => yScale(yAccessor(d)))

const line = bounds.append("path")
  .attr("d", lineGenerator(dataset))
  .attr("fill", "none")
  .attr("stroke", "#af9358")
  .attr("stroke-width", 2)

}