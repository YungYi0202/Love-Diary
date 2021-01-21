import './FullCalendar.css'
import React, { useState, useEffect , useRef} from 'react'
import { NavLink } from "react-router-dom";
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import AddFormButton from './AddFormButton'
//let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
import moment from 'moment';
import { RoughNotation } from "react-rough-notation"

import axios from 'axios'
const API_ROOT = 'http://love-diary.anyday.com.tw:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})
/*
        accountInfo:{
            accountId: acc_id,
            name1: name1,
            name2: name2,
            startDate: date
        }
*/
export default function FullCal({accountId}){
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedStr, setSelectedStr] = useState([]);
  const [dayEvents, setDayEvents] = useState([]);
  const [todoEvents, setTodoEvents] = useState([]);
  const calendarAPI = useRef(null);

  const handleDateSelect = (selectInfo) => {
    setSelectedStr([selectInfo.startStr, selectInfo.endStr]);
    _getDayEvents(selectInfo.startStr, selectInfo.endStr);
  }

  function isOverlapped(start, end){
    if( (start < selectedStr[0] && end < selectedStr[1]) || (start > selectedStr[0] && end > selectedStr[1]) ){
      return false;
    }else return true;
  }

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
      //console.log(!( (clickInfo.event.startStr < selectedStr[0] && clickInfo.event.endStr < selectedStr[1]) || (clickInfo.event.startStr > selectedStr[0] && clickInfo.event.endStr > selectedStr[1]) ))
      if(isOverlapped(clickInfo.event.startStr, clickInfo.event.endStr)){
        var newDay = dayEvents.filter(e => e._id!==clickInfo.event._def.extendedProps._id)
        setDayEvents(newDay);
        setSelectedStr(selectedStr);//用這個觸發rerender
      }
    }
  }

  const handleEvents = (events) => {
    setCurrentEvents(events);
  }

  const addEvent = (isAllDay, startTime, endTime, color, title, fav ) =>{
    let calendarApi = calendarAPI.current.getApi();
    if (title) {
      if(isAllDay){
        calendarApi.addEvent({
          title,
          start: startTime ,
          end: endTime ,
          backgroundColor: color,
          borderColor: color,
          textColor: "white",
          favorite: fav
        })
      }else{
        calendarApi.addEvent({
          title,
          start: startTime,
          end: endTime ,
          backgroundColor: "white",
          borderColor: color,
          textColor: color,
          favorite: fav
        });
      }
    }
  }

  const _getEvents = async()=>{
    const {
      data: { message, events }
    } = await instance.get('/getEvents', { params: { accountId } });
    return events;
  }

  const _getDayEvents = async(dayStart, dayEnd)=>{
    const {
      data: { message, events }
    } = await instance.get('/getDayEvents', { params: { accountId, dayStart, dayEnd } });
    /*if(events.length > 0){
      console.log(events[0]);
      console.log(events[0].start);
    }*/
    //console.log(events);
    setDayEvents(events);
  }

  const _eventsAdd = async(addInfo)=>{
    //console.log(addInfo);
    //var accountId = accountInfo.accountId;
    const favorite = addInfo.event._def.extendedProps.favorite;
    const {
      data: { message , event}
    } = await instance.post('/addEvent', { params: { accountId, addInfo , favorite} })
    if(message==='error'){
      console.log("_eventsAdd error");
    }
    if(isOverlapped(addInfo.event.startStr, addInfo.event.endStr )){
      setDayEvents([...dayEvents, event]);
    }
  }

  const _eventsRemove = async(removeInfo)=>{
    const _id = removeInfo.event._def.extendedProps._id;
    const {
      data: { message }
    } = await instance.post('/removeEvent', { params: { _id } })
    if(message==='error'){
      console.log("_eventsRemove error");
    }
  }

  function getSchemaEvent(eventApi){
    var event = {
      accountId : eventApi._def.extendedProps.accountId,
      todo : eventApi._def.extendedProps.todo,
      favorite : eventApi._def.extendedProps.favorite,
      title : eventApi._def.title,
      start : eventApi.startStr,
      end : eventApi.endStr,
      textColor : eventApi.textColor,
      borderColor : eventApi.borderColor,
      backgroundColor: eventApi.backgroundColor
    }
    return event;
  }
  
  const _eventDrop = async(eventDropInfo)=>{
    const _id = eventDropInfo.oldEvent._def.extendedProps._id;
    const newStart = eventDropInfo.event.startStr
    const newEnd = eventDropInfo.event.endStr
    const {
      data: { message }
    } = await instance.post('/dropEvent', { params: { _id, newStart, newEnd } })
    if(message==='error'){
      console.log("_eventsDrop error");
    }
    var newOverlapped = isOverlapped(newStart, newEnd);
    var oldOverlapped = isOverlapped(eventDropInfo.oldEvent.startStr, eventDropInfo.oldEvent.endStr);
    if(newOverlapped === true && oldOverlapped === false){
      var tmp = currentEvents.filter(e => e._def.extendedProps._id === _id);
      var event = getSchemaEvent(tmp[0]);
      setDayEvents([...dayEvents, event]);
    }else if(newOverlapped === false && oldOverlapped === true){
      var newDay = dayEvents.filter(e => e._id !== _id)
      setDayEvents(newDay);
    }
  }

  
  const addTodoEvent = async(title, color)=>{
    var event = {title: title, color: color};
    const {
      data: { message , todoEvent}
    } = await instance.post('/addTodoEvent', { params: { accountId, event } })
    if(message==='error'){
      console.log("addTodoEvent error");
    }
    setTodoEvents([...todoEvents, todoEvent]);
    
  }

  const _eventReceive = async(info) => {
      while(1){
        if(info.draggedEl.parentNode !== null ){
          var event = info.event;
          //console.log(event);
          //var accountId = accountInfo.accountId;
          const {
            data: { message }
          } = await instance.post('/receiveEvent', { params: { accountId, event } })
          if(message==='error'){
            console.log("_eventsReceive error");
          }
          //remove the todo event from todoEvent
          _eventsRemove(info);

          if(isOverlapped(event.startStr, event.endStr)){
            var e = getSchemaEvent(event);
            setDayEvents([...dayEvents, e]);
          }
          // remove the element from the "Draggable Events" list
          info.draggedEl.parentNode.removeChild(info.draggedEl);
          break;
        }
      }
  }

  const _getTodoEvents = async () =>{
    const {
      data: { message, events }
    } = await instance.get('/getTodoEvents', { params: { accountId } });
    setTodoEvents(events);
  }

  //for draggable todo events
  useEffect(() => {
    let draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl, {
      itemSelector: ".todoitem",
      eventData: function(eventEl) {
        let title = eventEl.getAttribute("title");
        let _id = eventEl.getAttribute("data");
        let color = eventEl.getAttribute("color");
        return {
          title: title,
          _id: _id, //id不知道能不能拿掉，怕draggable的地方會錯
          color: color
        };
      }
    });
  },[]);

  //initialization
  useEffect(() => {
    _getTodoEvents();
    //let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today
    let todayStr = moment().format("YYYY-MM-DD");
    const todayStr2 = moment(todayStr).add(1,"days").format("YYYY-MM-DD");
    setSelectedStr([todayStr, todayStr2]);
    _getDayEvents(todayStr, todayStr2);
  }, [])


  return (
    <div className='boook'>
      <div className="list">
          <button className='buttons'>
            <NavLink to="/">Home</NavLink>
          </button>
          <p></p>
          <button className='buttons now' disabled="false">
            <NavLink to="/Calendar">Calendar</NavLink>
          </button>
          <p></p>
          <button className='buttons'>
              <NavLink to="/Diary">Diary</NavLink>
          </button>
      </div>
      <div className='boookleft calleft'>
        <div className="calendar">
          <FullCalendar
            id = "myFullCalendar"
            ref = {calendarAPI}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true} //可以移動事件
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={_getEvents} // alternatively, use the `events` setting to fetch from a feed
            select={handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            eventDisplay='block'
            eventAdd={_eventsAdd}
            eventRemove={_eventsRemove}
            eventDrop={_eventDrop}
            eventChange={_eventDrop}
            aspectRatio={1.33}
            eventReceive={_eventReceive}
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
      <div className='boookright calright'>
        <AddFormButton addEvent={addEvent} addTodoEvent={addTodoEvent}></AddFormButton>
        <div className="dayEventsList__container">
            <div className="title-form">
              <RoughNotation type="highlight" show="true" className="title" color=" rgb(190, 226, 229)" animationDelay="1000">EVENTS</RoughNotation>
              <div className="subtitle">Date : {selectedStr[0]}</div>
            </div>
            <ul id="dayEventsList" className="eventlist">
              {dayEvents.map((ele,i)=>(
                ele.favorite ?
                <div key={i+1} id="dayEventsList__item" className="event">
                  <div id="dayEventsList__item-time" > <i class="fas fa-star" id={"favIcon"+i}></i>{
                  //可以跨日版本
                  (ele.start.length===10 || ele.start < selectedStr[0] && ele.end > selectedStr[1])? "       All-Day":
                  (ele.start >= selectedStr[0] && ele.end <= selectedStr[1])?ele.start.substr(11,5)+"~"+ele.end.substr(11,5):
                  (ele.start < selectedStr[0])? "00:00~"+ele.end.substr(11,5):ele.start.substr(11,5)+"~24:00"
                  } : {ele.title}</div>
                </div> : //----------------------------------------
                <div key={i+1} id="dayEventsList__item" className="event">
                <div id="dayEventsList__item-time" > <i class="far fa-star" id={"favIcon"+i}></i>{
                //可以跨日版本
                (ele.start.length===10 || ele.start < selectedStr[0] && ele.end > selectedStr[1])? "       All-Day":
                (ele.start >= selectedStr[0] && ele.end <= selectedStr[1])?ele.start.substr(11,5)+"~"+ele.end.substr(11,5):
                (ele.start < selectedStr[0])? "00:00~"+ele.end.substr(11,5):ele.start.substr(11,5)+"~24:00"
                } : {ele.title}</div>
                </div>))
              }
            </ul>
          </div>
        <div id="external-events" className="todo">
            <div className="title-form">
            <RoughNotation type="highlight" show="true" className="title" color=" rgb(190, 226, 229)" animationDelay="2000">TODO</RoughNotation>
            <RoughNotation type="circle" show="true" className="subtitle" color=" rgb(51, 173, 255)" animationDelay="3000">drag it !</RoughNotation>
            </div>
            {todoEvents.map((event,i) => (
              <div className="todoitem" title={event.title} data={event._id} color={event.color} key={i}>
                <i class="fas fa-angle-right"></i> {event.title}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText} </b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}
// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>{formatDate(event.start, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
//       <i>{event.title}</i>
//     </li>
//   )
// }