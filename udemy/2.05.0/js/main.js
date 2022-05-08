/*
*    main.js
*    Mastering Data Visualization with D3.js
*    2.5 - Activity: Adding SVGs to the screen
*/
const svg = d3.select("#chart-area").append("svg")
    .attr("width", 500)
    .attr("height", 400)

svg.append("rect")
    .attr("x", 100)
    .attr("y", 250)
    .attr("width", 100)
    .attr("height", 100)
    .attr("fill", "red")

