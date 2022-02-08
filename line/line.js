async function drawLineChart() {

    // 1. Access data
    const dataset = await d3.json("./data/my_weather_data.json")
  
    const yAccessor = d => d.temperatureMax
    const dateParser = d3.timeParse("%Y-%m-%d")
    const xAccessor = d => dateParser(d.date)
  
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

const freezingTemperaturePlacement = yScale(32)
const freezingTemperature = bounds.append("rect")
    .attr("x", 0)
    .aatr("width", dimensions.boundedWidth)
    .attr("y", freezingTemperaturePlacement)
    .attr("height", dimensions.boundedHeight
        - freezingTemperaturePlacement)

}
  drawLineChart()