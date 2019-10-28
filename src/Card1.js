import React from "react";
import "./Card.css";
import sound from "./alarm.mp3";

class Card extends React.Component {
  state = {
    textBox: "5:0",
    running: false,
    
    endTime: null,
    audio: new Audio(sound),
    countDown: setInterval(() => {
        if (this.state.running === true) {
          let remaining = this.endTime - Date.now();
          remaining = remaining < 0 ? 0 : remaining;
  
          this.setState({
            ...this.state,
            textBox: this.durToShow(remaining)
          });
          if (remaining === 0) {
            this.state.audio.play();
            clearInterval(this.state.countDown);
          }
        }
      }, 100),
  };
  durToShow(dur) {
    return Math.floor(dur / 60000) + ":" + Math.floor((dur % 60000) / 1000);
  }
  ShowToDur(text) {
    const matched = text.match(/^(\d{1,2}):(\d{1,2})$/);
    return matched[1] * 60000 + matched[2] * 1000;
  }
  changeHandler(e) {
    this.setState({ ...this.state, textBox: e.target.value });
  }

  ssHandler() {
    this.endTime = Date.now() + this.ShowToDur(this.state.textBox);
    this.setState({ ...this.state, running: !this.state.running });
  }
  render() {
    return (
      <div class="timer_card">
        <form onSubmit={e => e.preventDefault()}>
          <input
            pattern="^\d{1,2}[:.]\d{1,2}$"
            onChange={e => this.changeHandler(e)}
            value={this.state.textBox}
          />
        </form>
        <div onClick={e => this.ssHandler()}>start</div>
        <div>end</div>
        <div>config</div>
      </div>
    );
  }
}
export default Card;
