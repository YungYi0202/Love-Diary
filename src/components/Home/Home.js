import React, { useState , useEffect } from "react";
import { NavLink } from "react-router-dom";
import moment from 'moment';
import { RoughNotation, RoughNotationGroup } from "react-rough-notation"
import MyTimeline from './Timeline'
import "./Home.css";
import {Popover} from 'antd';


function Home({accountInfo}){
    const [dayCnt, setDayCnt] = useState(0);
    useEffect(()=>{
        const startDate = moment(accountInfo.startDate);
        const endDate = moment();
        const days = endDate.diff(startDate, 'days');
        setDayCnt(Number(days));
    }, []);
    
    return (
        <div className='boook homebook'>
            <div className="list">
                <button className='buttons now'>
                    <NavLink to="/">Home</NavLink>
                </button>
                <p> </p>
                <button className='buttons'>
                    <NavLink to="/Calendar">Calendar</NavLink>
                </button>
                <p> </p>
                <button className='buttons'>
                    <NavLink to="/Diary">Diary</NavLink>
                </button>
            </div>
            <div className="boookleft font_s">
                <div className="countingDays">
                    <RoughNotationGroup show={true} >
                    <div className="names">
                        
                        <RoughNotation type="circle" show="true" color=" #AEC6EF" animationDelay="1000" >{accountInfo.name1}</RoughNotation>
                        <p>and</p>
                        <RoughNotation type="box" show="true" color=" #AEC6EF" animationDelay="2000" >{accountInfo.name2}</RoughNotation>
                        
                    </div>
                    
                    <p className="textinside">have been in love for ...</p>
                    <div className="dayCount">
                        <RoughNotation className="dayCnt" type="highlight" show="true" color=" rgb(190, 226, 229)" animationDelay="3000" >{dayCnt}</RoughNotation>
                        <p>DAYS</p>
                    </div>
                    </RoughNotationGroup>
                </div>
            </div>  
            <div className="boookright">
                <Popover placement="top" content={"Add \"favorite\" event in Calendar page to record more important memory"}>
                <p className="line_start font_F">Our Love Story...</p>
                </Popover>
                <MyTimeline accountId={accountInfo.accountId}></MyTimeline>
            </div>
        </div>
    );
    
}
export default Home;