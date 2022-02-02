async function drawBars() {

    // 1. Access data
    const dataset = await d3.json("/data/my_weather_data.json")
    
    const drawHistogram = metric => {

    const xAccessor = d => d[metric]
    const yAccessor = d => d.length
  
    // 2. Create chart dimensions
  
const width = 600
    let dimensions = {
      width: width,
      height: width * 0.6,
      margin: {
        top: 30,
        right: 10,
        bottom: 50,
        left: 50,
      },
    }
    dimensions.boundedWidth = dimensions.width
      - dimensions.margin.left
      - dimensions.margin.right
    dimensions.boundedHeight = dimensions.height
      - dimensions.margin.top
      - dimensions.margin.bottom
  
    // 3. Draw canvas
  
    const wrapper = d3.select("#wrapper")
      .append("svg")
        .attr("width", dimensions.width)
        .attr("height", dimensions.height)
  
    const bounds = wrapper.append("g")
        .style("transform", `translate(${
          dimensions.margin.left
        }px, ${
          dimensions.margin.top
        }px)`)
  
    // 4. Create scales
  
    const xScale = d3.scaleLinear()
      .domain(d3.extent(dataset, xAccessor))
      .range([0, dimensions.boundedWidth])
      .nice()
  
    const binsGenerator = d3.bin()
      .domain(xScale.domain())
      .value(xAccessor)
      .thresholds(12)
  
    const bins = binsGenerator(dataset)
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, yAccessor)])
      .range([dimensions.boundedHeight, 0])
      .nice()
    
      // 5. draw data 
    const binsGroup = bounds.append("g")
  
    const binGroups = binsGroup.selectAll("g")
        .data(bins)
        .join("g")
          
    const barPadding = 1
    const barRects = binGroups.append("rect")
        .attr("x", d => xScale(d.x0) + barPadding / 2)
        .attr("y", d => yScale(yAccessor(d)))
        .attr("width", d => d3.max([
            0,
              xScale(d.x1) - xScale(d.x0) - barPadding
          ]))
            .attr("height", d => dimensions.boundedHeight - yScale(yAccessor(d))
        )
        .attr("fill", "conflower-blue")
  
    //Draw labwls

  const barText = binGroups.filter(yAccessor)
        .append("text")
        .attr("x", d => xScale(d.x0) + (
          xScale(d.x1) - xScale(d.x0)
        )/2)
        .attr("y", d => yScale(yAccessor(d)) - 5)
        .text(yAccessor)
        .style("text-anchor", "middle")
        .style("fill", "#666")
        .style("font-size", "12px")
        .style("font", "sans-serif")
        

    //draw mean line
  const mean = d3.mean(dataset, xAccessor)
  const meanLine = bounds.append("line")
        .attr("x1", xScale(mean))
        .attr("x2", xScale(mean))
        .attr("y1", -15)
        .attr("y2", dimensions.boundedHeight)     
        .attr("stroke", "maroon")
        .attr("stroke-dasharray", "2px 4px")

  const meanLabel = bounds.append("text")
        .attr("x", xScale(mean))
        .attr("y", -20)
        .text("mean")
        .attr("fill", "maroon")
        .style("font-size", "12px")
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif");
//draw axis 
    const xAxisGenerator = d3.axisBottom()
          .scale(xScale)
    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
            .style("transform", `translateY(${dimensions.boundedHeight}px)`)
      
    const xAxisLabel = xAxis.append("text")
         .attr("x", dimensions.boundedWidth / 2)
            .attr("y", dimensions.margin.bottom - 10)
            .attr("fill", "black")
            .style("font-size", "1.4em")
            .text(metric)
            .style("text-transform", "capitalize")
        }
//extra 
  const metrics = [
              "windSpeed",
              "moonPhase",
              "dewPoint",
              "humidity",
              "uvIndex",
              "windBearing",
              "temperatureMin",
              "temperatureMax",
              "visibility",
              "cloudCover",
            ]
  let selectedMetricIndex = 0
          
drawHistogram(metrics[selectedMetricIndex])
          
  const button = d3.select("body")
      .append("button")
      .text("Change metric")
          
  button.node().addEventListener("click", onClick)
      function onClick() {
      selectedMetricIndex = (selectedMetricIndex + 1) % metrics.length
      drawHistogram(metrics[selectedMetricIndex])
      }
}
drawBars()