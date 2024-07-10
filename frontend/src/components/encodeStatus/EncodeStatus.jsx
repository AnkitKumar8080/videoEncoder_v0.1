import React, { useContext, useEffect, useState } from "react";
import "./encodeStatus.scss";
import Loader from "../loader/Loader";
import UserContext from "../../context/UserContext";
import axios from "axios";
export default function EncodeStatus() {
  const [encPerc, setEncPerc] = useState(0);
  const { user } = useContext(UserContext);
  const [currentEncoding, setCurrentEncoding] = useState({});
  useEffect(() => {
    const source = new EventSource(
      `${process.env.REACT_APP_BASE_URL}/metadata/encprogcomp`,
      { withCredentials: false }
    );

    source.addEventListener("open", () => {
      console.log("SSE opened!");
    });

    source.addEventListener("message", (e) => {
      const data = JSON.parse(e.data);
      setEncPerc(data);
    });

    source.addEventListener("error", (e) => {
      console.error("Error", e);
    });

    return () => {
      source.close();
    };
  }, []);

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
        setCurrentEncoding(res.data.currentEncoding);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
    const interval = setInterval(fetchApi, 5000);
    return () => {
      clearInterval(interval);
    };
  }, [user.token]);
  console.log(currentEncoding);

  const handleStopEncoding = async () => {
    try {
      const config = {
        headers: {
          x_access_token: `Bearer ${user.token}`,
        },
      };
      const res = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/videoencode`,
        config
      );
      console.log(res.data);
    } catch (error) {
      console.log("Error : ", error);
    }
  };

  return (
    <div className="encodeStatus">
      <span>Current Encoding</span>

      {Object.keys(currentEncoding).length === 0 || encPerc === 0.0 ? (
        <div className="encodeDetails">
          <span style={{ color: "white" }}>none</span>
        </div>
      ) : (
        <div className="encodeDetails">
          <ul>
            <li>
              Movie: <span>{currentEncoding.filename}</span>
            </li>
            <li>
              Encoding type: <span>{currentEncoding.encoding}</span> to{" "}
              <span>libx264</span>
            </li>
            <li>
              Format: <span>mp4</span>
            </li>
            <li>
              <Loader perc={encPerc} />
            </li>
            <li>
              <button className="btn stop-btn" onClick={handleStopEncoding}>
                Stop Enc
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
