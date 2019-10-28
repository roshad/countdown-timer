import React, { useState } from "react";
import "./Card.css";
import sound from "./alarm.mp3";

function Card() {
  const [state, setState] = useState({
    duration: 300000,
    textBox: "5:0"
  });
  function durToShow(dur) {
    return Math.floor(dur / 60000) + ":" + Math.floor((dur % 60000) / 1000);
  }
  function changeHandler(e) {
    setState({ ...state, textBox: e.target.value });
  }
  function submitHandler(e) {
    e.preventDefault();
    const matched = e.target
      .getElementsByTagName("input")[0]
      .value.match(/^(\d{1,2})[:.](\d{1,2})$/);
    let pri_dur = matched[1] * 60000 + matched[2] * 1000;
    setState({
      ...state,
      duration: pri_dur,
      textBox: durToShow(pri_dur)
    });
  }
  function ssHandler(e) {
    let endTime = Date.now() + state.duration,
      running = false;
    const audio = new Audio(sound),
      countDown = setInterval(() => {
        if (state.running === true) {
          let remaining = endTime - Date.now();
          remaining = remaining < 0 ? 0 : remaining;
          setState({
            ...state,
            textBox: durToShow(remaining)
          });
          if (remaining === 0) {
            audio.play();
            clearInterval(countDown);
          }
        }
      }, 100);
    if (running === false) {
        endTime = Date.now() + state.duration

    } else {
      duration-=endTime-Date.now()
    }
    running =!running
  }

  return (
    <div class="timer_card">
      <form onSubmit={e => submitHandler(e)}>
        <input
          pattern="^\d{1,2}[:.]\d{1,2}$"
          onChange={e => changeHandler(e)}
          value={state.textBox}
        />
      </form>
      <div onClick={e => ssHandler(e)}>start</div>
      <div>end</div>
      <div>config</div>
    </div>
  );
}
export default Card;
