import React, { useContext, useEffect, useRef, useState } from "react";
import "./videoEncode.scss";
import _truncate from "lodash";
import Message from "../message/Message";
import UserContext from "../../context/UserContext";
import axios from "axios";
export default function VideoEncode() {
  const { metadata, setMetadata, user } = useContext(UserContext);
  const [filename, setFilename] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const filenameRef = useRef();
  const languageRef = useRef();
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const config = {
          headers: {
            x_access_token: `Bearer ${user.token}`,
          },
        };
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/metadata`,
          config
        );
        setMetadata(res.data);
        // to update the language drop down options
        setFilename(filenameRef.current.value);
        // console.log(metadata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchApi();
    // add set interval to fetch api after every 30sec
  }, [user.token]);

  const handleEncoding = async () => {
    try {
      setShowMsg(false);
      const mdata = {
        filename: filenameRef.current.value,
        encoding: "libx264",
        language: "",
      };
      const fileObj = metadata.find(
        (obj) => obj.filename === filenameRef.current.value
      );
      if (fileObj.codecEncoding === "h.265") {
        mdata.encoding = "libx265";
      }
      // edited for all audio files
      mdata.language =
        languageRef.current.value === "all"
          ? "all"
          : fileObj.languages.indexOf(languageRef.current.value);
      // console.log(mdata);

      const config = {
        headers: {
          x_access_token: `Bearer ${user.token}`,
        },
      };

      // request
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/videoencode`,
        mdata,
        config
      );
      if (res) {
        setShowMsg(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="video-encode">
      <span>Select the Movie you want to Encode</span>
      <div className="video-encode-wrap">
        <div className="video-encode-selector">
          <select
            className="movie-selector"
            ref={filenameRef}
            onChange={() => setFilename(filenameRef.current.value)}
          >
            {metadata?.map((fileObj, index) => (
              <option value={fileObj.filename}>
                {fileObj.filename.split(".")[0]}
              </option>
            ))}
          </select>
          <select className="language-selector" ref={languageRef}>
            <option value="all">all</option>
            {metadata?.map(
              (fileObj, index) =>
                fileObj.filename === filename &&
                fileObj.languages.map((lan, index) => (
                  <option value={lan}>{lan}</option>
                ))
            )}
          </select>
          <select className="encoding-selector">
            <option value="libx264" selected>
              libx264
            </option>
          </select>
          <button className="btn" onClick={handleEncoding}>
            Add to Queue
          </button>
        </div>
      </div>
      {showMsg && (
        <div className="message-popup">
          <Message />
        </div>
      )}
    </div>
  );
}
