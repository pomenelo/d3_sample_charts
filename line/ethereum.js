
async function drawLineChart() {
  // 1. Access data
  const dataset = await d3.csv("./data/eth22.csv")

  const yAccessor = d => d.Price
  const dateParser = d3.timeParse("%Y-%m-%d")
  const xAccessor = (d) => dateParser(d.Date)


  // 2. Create chart dimensions
  let dimensions = {
    width: window.innerWidth * 0.9,
    height: 400,
    margins: {
      top: 15,
      right: 25,
      bottom: 40,
      left: 60,
    },
  }
  dimensions.boundedWidth =
    dimensions.width 
    - dimensions.margins.left 
    - dimensions.margins.right

  dimensions.boundedHeight =
    dimensions.height - dimensions.margins.top - dimensions.margins.bottom

  // 3. draw canvas

  const wrapper = d3.select("#wrapper")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
    .style("transform", `translate(${dimensions.margins.left
    }px, ${
    dimensions.margins.top
    }px)`)

  //create scales
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice()

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice()


  // draw data
  const lineGenerator = d3
    .line()
    .x((d) => xScale(xAccessor(d)))
    .y((d) => yScale(yAccessor(d)));

  const line = bounds
    .append("path")
    .attr("d", lineGenerator(dataset))
    .attr("fill", "none")
    .attr("stroke", "#af9358")
    .attr("stroke-width", 2);

  const areaGenerator = d3.area()
  

  //draw peripherals
  const yAxisGenerator = d3.axisLeft().scale(yScale).tickArguments([10]);

  const yAxis = bounds.append("g").call(yAxisGenerator);

  const yAxisLabel = yAxis
    .append("text")
    .attr("x", -dimensions.boundedHeight / 2)
    .attr("y", -40)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .text("Price")
    .style("transform", "rotate(-90deg)")
    .style("text-anchor", "middle");

  const xAxisGenerator = d3
    .axisBottom()
    .scale(xScale)
    .tickFormat(d3.timeFormat("%d %b"))
    .ticks(8);

  const xAxis = bounds
    .append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${dimensions.boundedHeight}px)`);

  const xAxisLabel = xAxis
    .append("text")
    .attr("x", dimensions.boundedWidth / 2)
    .attr("y", 40)
    .attr("fill", "black")
    .style("font-size", "1.4em")
    .text("Date")

  //Interactions 
const listenerRect = bounds.append("rect")
       .attr("class", "listener-rect")
       .attr("width", dimensions.boundedWidth)
       .attr("height", dimensions.boundedHeight)
       .on("mousemove", onMouseMove)
       .on("mouseleave", onMouseLeave)

const tooltip = d3.select("#tooltip")
const tooltipCircle = bounds.append("circle")
      .attr("class", "tooltip-circle")
      .attr("r", 4)

function onMouseMove(event) {
  const mousePosition = d3.pointer(event)
  const hoveredDate = xScale.invert(mousePosition[0])

  const getDistanceFromHoveredDate = d => Math.abs(xAccessor(d) - hoveredDate)
  const closestIndex = d3.leastIndex(dataset, (a, b) => (
        getDistanceFromHoveredDate(a) - getDistanceFromHoveredDate(b)
  ))
  
  const closestDataPoint = dataset[closestIndex]

  const closestXValue = xAccessor(closestDataPoint)
  const closestYValue = yAccessor(closestDataPoint)

const formatDate = d3.timeFormat("%B %A %-d, %Y")
  tooltip.select("#date")
    .text(formatDate(closestXValue))

    const formatPrice = d => `${d3.format(".1f")(d)}USD`
    tooltip.select("#price")
        .html(formatPrice(closestYValue))

  const x = xScale(closestXValue) + dimensions.margins.left
  const y = yScale(closestYValue) + dimensions.margins.top

  tooltip.style("transform", `translate(`
     + `calc( -50% + ${x}px),`
     + `calc(-100% + ${y}px)`
     + `)`)

  tooltip.style("opacity", 1)

  tooltipCircle
     .attr("cx", xScale(closestXValue))
     .attr("cy", yScale(closestYValue))
     .style("opacity", 1)
  }

function onMouseLeave() {
  tooltip.style("opacity", 0)
  tooltipCircle.style("opacity",0)
}

}
drawLineChart();