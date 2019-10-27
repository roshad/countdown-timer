import React, { useState } from 'react';
import './Card.css'
import moment from 'moment'
function Card() {
    const [state, setState] = useState({ duration: null })
    function submitHandler(e) {
        e.preventDefault()
        const matched = e.target.getElementsByTagName("input")[0].value.match(/^(\d{1,2})[:.](\d{1,2})$/)
        const pri_dur = moment.duration()
        pri_dur.add(matched[1] * 1, 'm')
        pri_dur.add(matched[2] * 1, 's')
        setState({ duration: pri_dur })
    }
    function ssHandler(e) {
        const endTime = Date.now() + state.duration.asMilliseconds(),
            countDown = setInterval(() => { if (endTime - Date.now() <= 0) alert("time up") }, 100)


    }
    return (
        <div class="timer_card">
            <form onSubmit={e => submitHandler(e)}><input pattern="^\d{1,2}[:.]\d{1,2}$" defaultValue="0.5" /> </form>
            <div onClick={e => ssHandler(e)}>start</div>
            <div>end</div>
            <div>config</div>
        </div>
    )
}

export default Card;