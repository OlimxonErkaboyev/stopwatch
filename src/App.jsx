import React, { useState } from "react";
import DisplayComponent from "./Components/DisplayComponent";
import BtnComponent from "./Components/BtnComponent";
import "./App.css";
import { upload } from "@testing-library/user-event/dist/upload";

function App() {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInerv] = useState();
  const [status, setStatus] = useState(0);
  const start = () => {
    run();
    setStatus(1);
    setInerv(setInterval(run, 10));
  };
  var updatedMs = time.ms,
    updatedS = time.s,
    updatedM = time.m,
    updatedH = time.h;
  const run = () => {
    if (updatedM === 60) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    if (updatedMs === 100) {
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ ms: updatedMs, s: updatedS, m: updatedM, h: updatedH });
  };
  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };
  const reset = () => {
    clearInterval(interv);
    setStatus(0);
    setTime({ ms: 0, s: 0, m: 0, h: 0 });
  };
  const resume = () => start();
  return (
    <div className='main-section'>
      <h1>Stopwatch</h1>
      <div className='clock-holder'>
        <div className='stopwatch'>
          <DisplayComponent time={time} />
          <BtnComponent
            status={status}
            start={start}
            stop={stop}
            reset={reset}
            resume={resume}
          />
        </div>
      </div>
    </div>
  );
}
export default App;
