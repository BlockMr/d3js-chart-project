import data from "/Users/sasa/PycharmProjects/d3js-chart-project/src/input.js";

function addPointsToData() {
  const date = new Date();
  const point_btc = {
    date: date,
    value: (Math.random() * 100 + 20).toFixed(2),
  };
  const point_eth = {
    date: date,
    value: (Math.random() * 100 + 20).toFixed(2),
  };
  data.charts[0].points.push(point_btc);
  data.charts[1].points.push(point_eth);
}

function updateData() {
  setInterval(() => {
    addPointsToData();
    console.log(all_data.charts)
  }, 1000);
}

updateData();
