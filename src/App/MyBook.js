import Home from '../components/Home/Home'
import FullCal from '../components/Calendar/FullCalendar'
import Diary from '../components/Diary/Diary'
import React ,{useState} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import './App.css';

function Book({accountInfo}){
    const [fade, setFade]= useState(true)
    const fadeDone = ()=>{
        setFade(false);
    }
    function home(){
        return <Home accountInfo={accountInfo} fade={fade} fadeDone={fadeDone}></Home>
    }
    function calendar(){
        return <FullCal accountId={accountInfo.accountId}></FullCal>
    }
    function diary(){
        return <Diary accountId={accountInfo.accountId}></Diary>
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/Calendar" component={calendar} />
                <Route exact path="/Diary" component={diary} />
            </Switch>
        </BrowserRouter>
    )
}
export default Book
