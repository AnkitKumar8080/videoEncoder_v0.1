import React, { useEffect, useRef } from "react";
import "./message.scss";
export default function Message() {
  const innerBarRef = useRef();
  const messageDivRef = useRef();
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 100) {
        clearInterval(interval);
        messageDivRef.current.style.display = "none";
      } else {
        progress += 1;
        innerBarRef.current.style.width = `${progress}%`;
      }
    }, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="message" ref={messageDivRef}>
      <div className="mssg">
        <span>video added to queue</span>
      </div>
      <div className="outer-div1">
        <div className="inner-div2" ref={innerBarRef} />
      </div>
    </div>
  );
}
