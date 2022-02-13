async function drawLineChart() {

    // 1. Access data
    const dataset = await d3.json("./data/nfts.csv")
    console.log(dataset[0])

    const yAccessor = d => d.stats.market_cap
    const dateParser = d3.timeParse("%Y-%m-%d")
    const xAccessor = d => dateParser(d.created_date)
}