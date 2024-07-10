import React from "react";
import "./loader.scss";

export default function Loader({ perc }) {
  return (
    <div className="loader">
      <div className="outer-div">
        <div className="filler-div" style={{ width: `${perc}%` }} />
        <span>{perc} %</span>
      </div>
    </div>
  );
}
