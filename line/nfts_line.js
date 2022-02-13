async function drawLineChart() {

    // 1. Access data
    const dataset = await d3.json("./data/nfts.csv")
    console.log(dataset[0])
}