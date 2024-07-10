import React, { useContext, useEffect, useState } from "react";
import "./resourceVitals.scss";
import MetricGauge from "../metricGauge/MetricGauge";
import axios from "axios";
import UserContext from "../../context/UserContext";

export default function ResourceVitals() {
  const [resUsage, setResUsage] = useState({});
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const config = {
          headers: { x_access_token: `Bearer ${user.token}` },
        };
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/metadata/resourceusage`,
          config
        );
        setResUsage(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
    const interval = setInterval(fetchApi, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="resourceVitals">
      <span>Resource Usage</span>
      <div className="vitals">
        <MetricGauge name={"CPU Usage"} perc={resUsage.cpuUsage} />
        <MetricGauge name={"RAM Usage"} perc={resUsage.ramUsage} />
        <MetricGauge name={"Disk Usage"} perc={resUsage.diskUsage} />
        <MetricGauge name={"Temperature"} perc={resUsage.temperature} />
      </div>
    </div>
  );
}
