async function drawBars() {

// 1. Access data
const dataset = await d3.csv("/data/opera.csv")
console.log(dataset[0])


// const drawHistogram = metric => {

// const xAccessor = d => d[metric]
// const yAccessor = d => d.length

// // 2. Create chart dimensions
      
// const width = 600
// let dimensions = {
//     width: width,
//     height: width * 0.6,
//     margin: {
//         top: 30,
//         right: 10,
//         bottom: 50,
//         left: 50,
//      },
//         }
// dimensions.boundedWidth = dimensions.width
//   - dimensions.margin.left
//     - dimensions.margin.right
// dimensions.boundedHeight = dimensions.height
//  - dimensions.margin.top
//    - dimensions.margin.bottom

  
// 3. Draw canvas
  
//  const wrapper = d3.select("#wrapper")
//   .append("svg")
//   .attr("width", dimensions.width)
//   .attr("height", dimensions.height)
  
//   const bounds = wrapper.append("g")
//   .style("transform", `translate(${
//      dimensions.margin.left
//      }px, ${
//      dimensions.margin.top
//      }px)`)

    
}