import React, { useState } from "react";
import "./Card.css";
import moment from "moment";
import sound from "./alarm.mp3";
function Card() {
  const [state, setState] = useState({
    duration: moment.duration(),
    showTime: 0
  });
  
  function submitHandler(e) {
    e.preventDefault();
    const matched = e.target
      .getElementsByTagName("input")[0]
      .value.match(/^(\d{1,2})[:.](\d{1,2})$/);
    const pri_dur = moment.duration();
    pri_dur.add(matched[1] * 1, "m");
    pri_dur.add(matched[2] * 1, "s");
    setState({...state, duration: pri_dur });
  }
  function ssHandler(e) {
    const endTime = Date.now() + state.duration.asMilliseconds(),
      audio = new Audio(sound),
      countDown = setInterval(() => {
        const remaining = endTime - Date.now();
        let showTime = "";
        showTime +=
          Math.floor(remaining / 60000) +
          ":" +
          Math.floor((remaining % 60000) / 1000);
        if (remaining <= 0) {
          audio.play();
          clearInterval(countDown);
        }
      }, 100);
  }
  function changeHandler(e) {
    setState({ showTime: e.target.value });
    console.log(state.duration)
  }
  return (
    <div class="timer_card">
      <form onSubmit={e => submitHandler(e)}>
        <input
          pattern="^\d{1,2}[:.]\d{1,2}$"
          onChange={e => changeHandler(e)}
          value={state.showTime}
        />
      </form>
      <div onClick={e => ssHandler(e)}>start</div>
      <div>end</div>
      <div>config</div>
    </div>
  );
}
export default Card;
