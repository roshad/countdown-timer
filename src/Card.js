import React from "react";
import "./Card.css";
import sound from "./dingdong.wav";
import restartSVG from "./restart.svg";
import resetSVG from "./reset.svg";

class Card extends React.Component {
  durToShow(dur) {
    return Math.floor(dur / 60000) + ":" + Math.floor((dur % 60000) / 1000);
  }
  ShowToDur(text) {
    const matched = text.match(/^(\d{1,2})[:.]?(\d{1,2})?$/);
    return matched[1] * 60000 + (matched[2] || 0) * 1000;
  }
  constructor(props) {
    super(props);
    const aud = new Audio(sound);
    aud.loop = true;
    this.state = {
      duration: this.props.dur,
      remain_text: this.durToShow(this.props.dur),
      running: false,
      endTime: null,
      audio: aud,
      reset: false,
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
  }
  submitHandler(e) {
    e.preventDefault();
    this.setState({ duration: this.ShowToDur(this.state.remain_text) });
    this.setState(state => ({ remain_text: this.durToShow(state.duration) }));
  }
  changeHandler(e) {
    this.setState({ remain_text: e.target.value });
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
    console.log("test");
  }
  configHandler() {
    this.setState({
      remain_text: this.durToShow(this.state.duration),
      running: true,
      endTime: Date.now() + this.state.duration
    });
    this.state.audio.pause();
  }
  resetEnabled() {
    this.setState({ reset: !this.state.reset });
  }
  render() {
    return (
      <div className="timer_card">
        <form onSubmit={e => this.submitHandler(e)}>
          <input
            id="time"
            pattern="^(\d{1,2})[:.]?(\d{1,2})?$"
            onChange={e => this.changeHandler(e)}
            value={this.state.remain_text}
            title="^(\d{1,2})[:.]?(\d{1,2})?$"
          />
        </form>
        <div id="btn-group">
          {this.state.reset ? (
            <button onClick={e => this.resetHandler(e)}>
              <img id="reset-img" src={resetSVG} alt="reset" />
            </button>
          ) : null}

          <button id="restart" onClick={e => this.restartHandler(e)}>
            <img id="restart-img" src={restartSVG} alt="restart" />
            
            
          </button>
        </div>

        <label>
          <input
            id="resetCheck"
            type="checkbox"
            onChange={e => this.resetEnabled()}
          />
          Enable Reset
        </label>
      </div>
    );
  }
}

export default Card;
