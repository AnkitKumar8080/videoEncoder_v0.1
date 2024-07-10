import React, { useState } from "react";
import "./home.scss";
import { RiDashboard2Line } from "react-icons/ri";
import { PiWrenchBold } from "react-icons/pi";
import { IoStatsChartOutline } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import Dashboard from "../../components/dashboard/Dashboard";
import VideoEncode from "../../components/videoEncode/VideoEncode";
import QueueStatus from "../../components/queueStatus/QueueStatus";
export default function Home() {
  const [selectedList, setSelectedList] = useState(1);

  return (
    <div className="home">
      <div className="left-section">
        <span>Transcoder</span>
        <ul>
          <li
            className={`${selectedList === 1 ? "selected" : ""}`}
            onClick={() => setSelectedList(1)}
          >
            <RiDashboard2Line className="dash-icons" /> <span>Dashboard</span>
          </li>
          <li
            className={`${selectedList === 2 ? "selected" : ""}`}
            onClick={() => setSelectedList(2)}
          >
            <PiWrenchBold className="dash-icons" />
            <span>Encode Video</span>
          </li>
          <li
            className={`${selectedList === 3 ? "selected" : ""}`}
            onClick={() => setSelectedList(3)}
          >
            <IoStatsChartOutline className="dash-icons" />
            <span>Status</span>
          </li>
          {/* <li
            className={`${selectedList === 4 ? "selected" : ""}`}
            onClick={() => setSelectedList(4)}
          >
            <FiSettings className="dash-icons" />
            <span>Settings</span>
          </li> */}
        </ul>
      </div>
      <div className="right-section">
        {selectedList === 1 && <Dashboard />}
        {selectedList === 2 && <VideoEncode />}
        {selectedList === 3 && <QueueStatus />}
      </div>
    </div>
  );
}
