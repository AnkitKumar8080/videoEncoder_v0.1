import React from "react";
import "./dashboard.scss";
import ResourceVitals from "../resourceVitals/ResourceVitals";
import EncodeStatus from "../encodeStatus/EncodeStatus";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <ResourceVitals />
      <EncodeStatus />
    </div>
  );
}
