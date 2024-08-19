import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

export default function LinePlot({ data }) {
  const svgRef = useRef(null);

  const chartName = data.chart_name;
  const charts = data.charts;

  useEffect(() => {
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 1, 5)
      .attr("text-anchor", "middle")
      .style("font", "bold 30px sans-serif")
      .attr("stroke", "white")
      .text(chartName);

    const x = d3
      .scaleTime()
      .domain(
        d3.extent(
          charts.flatMap((chart) => chart.points),
          (p) => p.date
        )
      )
      .range([0, width]);

    svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).ticks(4));

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(
          charts.flatMap((chart) => chart.points),
          (p) => p.value
        ),
      ])
      .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y));

    charts.forEach((element) => {
      const name = element.name;
      const color = element.color;
      const points = element.points;
      try {
        const points = points.slice(-100);
      } catch (error) {}

      svg
        .append("path")
        .datum(points)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 1.5)
        .attr(
          "d",
          d3
            .line()
            .x(function (p) {
              return x(p.date);
            })
            .y(function (p) {
              return y(p.value);
            })
        );
    });
  }, [data]);

  return <svg ref={svgRef} width="500" height="500"></svg>;
}
