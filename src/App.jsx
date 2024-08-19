import "./App.css";
import Container from "react-bootstrap/Container";
import LinePlot from "./components/linePlot";
import data from "./input";
import { useState } from "react";

export default function App() {
  const [all_data, set_all_data] = useState();

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
    console.log(data);
  }

  function updateData() {
    setInterval(() => {
      addPointsToData;
    }, 1000);
  }

  updateData();

  return <Container className="App"></Container>;
}
