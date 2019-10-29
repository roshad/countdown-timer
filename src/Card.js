import React from "react";
import "./Card.css";
import sound from "./alarm.mp3";

const {globalShortcut,app} = window.require('electron').remote

const electron=window.require('electron')


  globalShortcut.register('Alt+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

class Card extends React.Component {
  state = {
    duration:300000,
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
          this.setState({running:false})
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
  changeHandler(e) {
    this.setState({  textBox: e.target.value });
  }
  ssHandler() {
    this.endTime = Date.now() + this.ShowToDur(this.state.textBox);
    this.setState({ running: !this.state.running });
  }
  resetHandler(){
    this.setState({textBox:this.durToShow(this.state.duration),running:false})
    this.state.audio.pause()
  }
  restartHandler(){
    this.resetHandler()
    this.ssHandler()
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
        <div onClick={e => this.ssHandler(e)}>start</div>
        <div onClick={e => this.resetHandler(e)}>reset</div>
        <div onClick={e => this.restartHandler(e)}>restart</div>
        <div>config</div>
      </div>
    );
  }
}

export default Card;
