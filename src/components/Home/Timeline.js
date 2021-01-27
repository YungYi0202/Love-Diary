import React, { useState , useEffect } from "react";
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import axios from 'axios'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import "./Home.css";
const theme = createMuiTheme({
  palette: {
    primary: {
      // light: 这将从 palette.primary.main 中进行计算，
      main: '#7FBAF4',
      // dark: 这将从 palette.primary.main 中进行计算，
      // contrastText: 这将计算与 palette.primary.main 的对比度
    },
    secondary: {
      //light: '#0066ff',
      main: '#5891ED',
      // dark: 这将从 palette.secondary.main 中进行计算，
      //contrastText: '#ffcc00',
    },
    info: {
        main: "#677DBB"
    },
    // 使用 `getContrastText()` 来最大化
    // 背景和文本的对比度
    contrastThreshold: 3,
    // 使用下面的函数用于将颜色的亮度在其调色板中
    // 移动大约两个指数。
    // 例如，从红色 500（Red 500）切换到 红色 300（Red 300）或 红色 700（Red 700）。
    tonalOffset: 0.2,
  },
});

const API_ROOT = 'http://localhost:4000/api'
//const API_ROOT = 'http://love-diary.anyday.com.tw:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function colorIndex(i){
    if(i%2===0) return "primary"
    else return "secondary"
}

function MyTimeline({accountId}){
    const [favEvents, setFavEvents] = useState([]);
    const _getFavEvents = async () =>{
        const {
            data: { message, events }
        } = await instance.get('/getFavEvents', { params: { accountId } });
        setFavEvents(events);
        //console.log(events);
    }

    useEffect(()=>{
        _getFavEvents();
    },[]);

    return(
        <div className="font_F timeline">
            <ThemeProvider theme={theme}>
                <Timeline align="alternate">
                    {favEvents.map((e, i)=>(
                        <TimelineItem>
                            <TimelineOppositeContent>
                                {e.start}
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color={colorIndex(i)}/>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>{e.title}</TimelineContent>
                        </TimelineItem>
                    ))}
                    <TimelineItem>
                        <TimelineSeparator>
                        <TimelineDot />
                        </TimelineSeparator>
                        <TimelineContent>To be Continued...</TimelineContent>
                    </TimelineItem>
                </Timeline>
            </ThemeProvider>
        </div>
        
        
    )
}
export default MyTimeline;