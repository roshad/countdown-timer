import React from "react";
import "./Card.css";
import sound from "./alarm.mp3";
const { ipcRenderer } = window.require("electron");
ipcRenderer.on("restart", ()=>document.getElementById("restart").click());
class Card extends React.Component {
  state = {
    duration: 300000,
    remain_text: "5:0",
    running: false,
    endTime: null,
    audio: new Audio(sound),
    countDown: setInterval(() => {
      if (this.state.running === true) {
        let remaining = this.state.endTime - Date.now();
        remaining = remaining < 0 ? 0 : remaining;

        this.setState({
          ...this.state,
          remain_text: this.durToShow(remaining)
        });
        if (remaining === 0) {
          this.state.audio.play();
          this.setState({ running: false });
        }
      }
    }, 100)
  };
  durToShow(dur) {
    return Math.floor(dur / 60000) + ":" + Math.floor((dur % 60000) / 1000);
  }
  ShowToDur(text) {
    const matched = text.match(/^(\d{1,2}):(\d{1,2})$/);
    return matched[1] * 60000 + matched[2] * 1000;
  }
  submitHandler(e) {
    e.preventDefault();
    this.setState({ duration: this.ShowToDur(this.state.remain_text) });
  }
  changeHandler(e) {
    this.setState({ remain_text: e.target.value });
  }
  ssHandler() {
    this.setState({
      running: !this.state.running,
      endTime: Date.now() + this.ShowToDur(this.state.remain_text)
    });
  }
  resetHandler() {
    this.setState({
      remain_text: this.durToShow(this.state.duration),
      running: false
    });
    this.state.audio.pause();
  }
  restartHandler() {
    this.setState({
      remain_text: this.durToShow(this.state.duration),
      running: true,
      endTime: Date.now() + this.state.duration
    });
    this.state.audio.pause();
    console.log("test")
  }
  render() {
    
    return (
      <div class="timer_card">
        <form onSubmit={e => this.submitHandler(e)}>
          <input
            pattern="^\d{1,2}[:.]\d{1,2}$"
            onChange={e => this.changeHandler(e)}
            value={this.state.remain_text}
          />
        </form>
        <div onClick={e => this.ssHandler(e)}>start</div>
        <div onClick={e => this.resetHandler(e)}>reset</div>
        <div id="restart" onClick={e => this.restartHandler(e)}>restart</div>
        <div>config</div>
      </div>
    );
  }
}

export default Card;
