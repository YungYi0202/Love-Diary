import { React } from "react";
import './Start.css'


function Start({handleStart}){
    return(
        <div className="whole">
        <p className="ProjectName font_s">Love Diary</p>
        <button className="Start font_F" onClick={handleStart}>Click to Start</button>
        </div>
    )
}
export default Start