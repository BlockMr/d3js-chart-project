import "./App.css";
import Container from "react-bootstrap/Container";
import data from "./input";
import {useEffect, useState} from "react";
import LinePlot from "./components/LinePlot.jsx";

export default function App() {
  const [all_data, set_all_data] = useState();
  useEffect(() => {
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
      // console.log(data)
      set_all_data({ ...data });
    }

    const interval = setInterval(() => {
      addPointsToData();
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  return <Container className="App">
    <LinePlot data={all_data}/>
  </Container>;
}
