import React , {useState, useEffect}from 'react'
import { NavLink } from "react-router-dom";
import PicturesWall from "./PicturesWall";
import { DoubleLeftOutlined ,  DoubleRightOutlined , FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Rate, DatePicker, message} from 'antd';



import "./Diary.css"

import axios from 'axios'

const API_ROOT = 'http://love-diary.anyday.com.tw:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})


const customIcons = {
    1: <FrownOutlined />,
    2: <FrownOutlined />,
    3: <MehOutlined />,
    4: <SmileOutlined />,
    5: <SmileOutlined />,
  };

export default function Diary({accountId}){
    const [dateStr, setDateStr] = useState();
    const [photoText, setPhotoText] = useState("");
    const [mood, setMood] = useState(3);
    const [text, setText] = useState("");
    const [isInDatabase, setIsInDatabase] = useState(false);

    const goLeftPage = () =>{
        const newDate = moment(dateStr).subtract(1,"days").format("YYYY-MM-DD");
        setDateStr(newDate);
    }

    const goRightPage = () =>{
        const newDate = moment(dateStr).add(1,"days").format("YYYY-MM-DD");
        setDateStr(newDate);
    }

    const photoText_onChange = (e) => {
        //console.log("photoText:" + e.target.value);
        setPhotoText(e.target.value);
    }

    const mood_onChange = (v) =>{
        setMood(v);
    }
    
    const text_onChange = (e) => {
        //console.log(e.target.value);
        setText(e.target.value);
    }

    const date_onChange = (val, str) => {
        console.log("str:"+str);
        if(str!==""){
            setDateStr(str);
        }
    }

    const _getContent = async () => {
        const {
            data: { msg, content}
        } = await instance.get('/getContent',{ params: { accountId, dateStr}});
        if(msg==="exist"){
            //console.log("getContent");
            //console.log(content);
            setMood(content.mood);
            setText(content.text);
            setIsInDatabase(true);
            setPhotoText(content.photoText);
        }else{
            setMood(3);
            setText("");
            setIsInDatabase(false);
            setPhotoText("");
        }
    }

    const _addContent = async () =>{
        const {
            data: { msg}
        } = await instance.post('/addContent',{ params: { accountId, dateStr, mood, text, photoText}});
        if(msg==="success"){
            message.success('Save successfully',3);
            setIsInDatabase(true);
        }else{
            message.error('Fail to save',3);
        }
    }

    const _updateContent = async () => {
        const {
            data: { msg}
        } = await instance.post('/updateContent',{ params: { accountId, dateStr, mood, text, photoText}});
        if(msg==="success"){
            message.success('Save successfully',3);
        }else{
            message.error('Fail to save',3);
        }
    }

    const onSave = () =>{
        if(isInDatabase){
            _updateContent();
        }else{
            _addContent();
        }
    }

    useEffect(()=>{
        if(dateStr!==undefined){
            _getContent();
        }
    },[dateStr]);

    useEffect(()=>{
        //let str = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
        let str = moment().format("YYYY-MM-DD");
        setDateStr(str);
    },[]);

    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

    return (
        <div className='boook'>
            <div className="list">
                <button className='buttons'type="button" >
                    <NavLink to="/">Home</NavLink>
                </button>
                <p></p>
                <button className='buttons' type="button">
                    <NavLink to="/Calendar">Calendar</NavLink>
                </button>
                <p></p>
                <button className='buttons now' disabled={true} type="button">
                    <NavLink to="/Diary">Diary</NavLink>
                </button>
            </div>
            <div className='boookleft'>
                <DoubleLeftOutlined onClick={goLeftPage} className="leftbutton"/>
                <div className="today font_s">
                    <div>
                        <DatePicker format="YYYY-MM-DD"  onChange={date_onChange}></DatePicker>
                        <div className="today_title">Date : </div>
                        <div className="today_date">{dateStr}</div>
                    </div>
                    <div>
                        <div className="today_mood">Mood : </div>
                        
                        <Rate className="mood_rate" tooltips={desc} style={{color:"#DBB600"}}value={mood} onChange={mood_onChange} character={({ index }) => customIcons[index + 1]} className="mood"></Rate>
                        
                    </div>
                </div>
                <div  className="RecordToday"></div>
                <textarea placeholder="Record your beautiful Love Memory..."
                    // rows="12" cols="40"
                    onChange = {text_onChange}
                    value={text}
                    className="RecordText font_F"
                ></textarea>
                <button onClick={onSave} className="save_button font_s">save</button>
            </div>
            <div className='boookright'>
                <DoubleRightOutlined onClick={goRightPage} className="rightbutton"/>
                <PicturesWall dateStr={dateStr} accountId={accountId} photoText={photoText} photoText_onChange={photoText_onChange}></PicturesWall>
            </div>
        </div>
    );
}