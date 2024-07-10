import React from "react";
import "./metricGauge.scss";

export default function MetricGauge({ perc, name }) {
  const colorCal = () => {
    if (perc <= 25) return "greenyellow";
    if (perc <= 50) return "yellow";
    if (perc <= 75) return "orange";
    if (perc <= 85) return "#b4451f";
    else return "red";
  };
  const calDeg = () => {
    return (perc / 100) * 360;
  };
  return (
    <div className="metricGauge">
      <span>{name}</span>
      <div
        className="gauge"
        style={{
          background: `conic-gradient(${colorCal()} ${calDeg()}deg, rgb(28, 28, 28) 0deg)`,
        }}
      >
        <div className="filler-div">
          <span style={{ color: `${colorCal()}` }}>{perc}%</span>
        </div>
      </div>
    </div>
  );
}
