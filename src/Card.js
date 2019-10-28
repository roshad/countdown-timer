import React, { useState } from "react";
import "./Card.css";
import sound from "./alarm.mp3";

function Card() {
  const [state, setState] = useState({
    textBox: "5:0",
    running:false,
    countDown:setInterval(() => {
        if (state.running === true) {
          let remaining = endTime - Date.now();
          remaining = remaining < 0 ? 0 : remaining;
          
          setState({
            ...state,
            textBox: durToShow(remaining)
          });
          if (remaining === 0) {
            audio.play();
            clearInterval(state.countDown);
          }
        }
      }, 100)
  });
  function durToShow(dur) {
    return Math.floor(dur / 60000) + ":" + Math.floor((dur % 60000) / 1000);
  }
  function ShowToDur(text) {
    const matched = text.match(/^(\d{1,2}):(\d{1,2})$/);
    return matched[1] * 60000 + matched[2] * 1000;
  }
  function changeHandler(e) {
    setState({ ...state, textBox: e.target.value });
  }
  let endTime=Date.now() + ShowToDur(state.textBox)
  const audio = new Audio(sound)
  
  function ssHandler() {
    endTime = Date.now() + ShowToDur(state.textBox) ;    
    setState({...state,running:!state.running})    
  }

  return (
    <div class="timer_card">
      <form onSubmit={e => e.preventDefault()}>
        <input
          pattern="^\d{1,2}[:.]\d{1,2}$"
          onChange={e => changeHandler(e)}
          value={state.textBox}
        />
      </form>
      <div onClick={e => ssHandler()}>start</div>
      <div>end</div>
      <div>config</div>
    </div>
  );
}
export default Card;
