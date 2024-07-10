import React, { useContext, useEffect, useState } from "react";
import "./queueStatus.scss";
import { RxCross2 } from "react-icons/rx";
import UserContext from "../../context/UserContext";
import axios from "axios";
export default function QueueStatus() {
  const { user } = useContext(UserContext);
  const [queueStatus, setQueueStatus] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const config = {
          headers: {
            x_access_token: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/metadata/queuestatus`,
          config
        );
        setQueueStatus(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
    const interval = setInterval(fetchApi, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [user.token]);

  const handleRemoveQueue = async (filename) => {
    try {
      const config = {
        headers: {
          x_access_token: `Bearer ${user.token}`,
        },
      };

      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/removeFromQueue/${filename}`,
        config
      );
      console.log(res.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="queue-status">
      <span>Waiting Encodings</span>
      <div className="wait-queue">
        {!queueStatus.encodeQueue == [] ? (
          queueStatus.encodeQueue.map((encQueue, index) => (
            <div className="wait-queue-info">
              <ul>
                <li>
                  File name: <span>{encQueue.filename}</span>
                </li>
                <li>
                  Encoding type: <span>{encQueue.encoding}</span> to{" "}
                  <span>libx264</span>
                </li>
                <li>
                  Format: <span>mp4</span>
                </li>
                {/* <li>
                  Language: <span>eng</span>
                </li> */}
              </ul>
              <RxCross2
                className="remove-icon"
                onClick={() => handleRemoveQueue(encQueue.filename)}
              />
            </div>
          ))
        ) : (
          <div className="wait-queue-info">
            {" "}
            <span style={{ color: "red" }}>Queue is Empty</span>
          </div>
        )}
      </div>
      <span>Completed Encodings</span>
      <div className="wait-queue">
        {!queueStatus.completedQueue == [] ? (
          queueStatus.completedQueue.map((compQue, index) => (
            <div className="wait-queue-info">
              <ul>
                <li>
                  File name: <span>{compQue.filename}</span>
                </li>
                <li>
                  Encoding type: <span>{compQue.fromCodec}</span> to{" "}
                  <span>{compQue.toCodec}</span>
                </li>
                <li>
                  Format: <span>mp4</span>
                </li>
                {/* <li>
                  Language: <span>eng</span>
                </li> */}
              </ul>
            </div>
          ))
        ) : (
          <div className="wait-queue-info">
            {" "}
            <span style={{ color: "red" }}>Queue is Empty</span>
          </div>
        )}
      </div>
      <span>Incomplete Encodings</span>
      <div className="error-queue"></div>
    </div>
  );
}
