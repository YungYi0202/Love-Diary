import { Form, DatePicker, Input, Checkbox, Modal, Switch, Menu, Dropdown, Popover} from 'antd';
import { useState } from 'react';
import moment from 'moment';
import "./AddForm.css"
import { HeartOutlined ,  DownOutlined } from '@ant-design/icons';

const { RangePicker } = DatePicker;
// const { RangePicker2 } = TimePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};


function valid(startTime, endTime){

  if(startTime==='' ||endTime==='') return false;
  return true;
}

function AddForm({show, handleClose, addEvent, addTodoEvent}){
    const [allDay, setAllDay] = useState(false);
    const [color, setColor] = useState('');
    const [colorStr, setColorStr] = useState('select color');
    const [title, setTitle] = useState('');
    const [timeVal, setTimeVal] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [todo, setTodo] = useState(false);
    const [fav, setFav] = useState(false);

    // const colorOptions = [
    //     { label: 'blue', value: 'blue' },
    //     { label: 'red', value: 'red' },
    //     { label: 'green', value: 'green' },
    // ];

    // const color_onChange = e => {
    //     setColor(e.target.value);
    // };

    const allDay_onChange = e =>{
      setAllDay(e.target.checked);
    };

    const todo_onChange = e =>{
      setTodo(e.target.checked);
    };

    const fav_onChange = checked => {
      setFav(checked);
    }

    const time_onChange = (val, str) =>{
      setTimeVal(val);
      //console.log(str);
      //console.log("start"+startTime);
      //console.log(str[0].substr(0,10) + "T" + str[0].substr(11,8));
      if(allDay){
        setStartTime(str[0]);
        const end = moment(str[1]).add(1,"days");
        setEndTime(end.format("YYYY-MM-DD"));
      }else{
        //可以跨日
        //setStartTime(str[0].substr(0,10) + "T" + str[0].substr(11,8));
        //setEndTime(str[1].substr(0,10) + "T" + str[1].substr(11,8));
        //不能跨日
        setStartTime(str[0]);
        setEndTime(str[1]);
      }
      
    }

    const onFinish = () => {
      // Should format date value before submit.
      if(todo){
        addTodoEvent(title, color);
        handleClose();
      }
      else if(valid(startTime, endTime)){
        addEvent(allDay, startTime, endTime, color, title, fav);
        handleClose();
      }else{
        alert("Please select time");
      }
    };

    function Time(){
      if(allDay){
        return <RangePicker format="YYYY-MM-DD" value={timeVal} onChange={time_onChange} disabled={todo}/>;
      }else{
        return <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" value={timeVal} onChange={time_onChange} disabled={todo}/>;
      }
    }

    const colorTable = [
      {no: "#F78C98", str: "Red"},
      {no: "#F1A559", str: "Orange"},
      {no: "#FCD616", str: "Yellow"},
      {no: "#95D968", str: "Green"},
      {no: "#85D4D5", str: "Light Blue"},
      {no: "#5891ED", str: "Baby Blue"},
      {no: "#CD9FF3", str: "Purple"},
      {no: "#BF9C86", str: "Brown"},
      {no: "#8C8C8C", str: "Grey"},
    ]

    const color_onClick = ({ key }) => {
      setColor(colorTable[key].no);
      setColorStr(colorTable[key].str);
    };

    const menu = (
      <Menu onClick={color_onClick}>
        {colorTable.map((ele,i)=>
          <Menu.Item key={i}>{ele.str}</Menu.Item>
        )}
      </Menu>
    );

    return (
      <Modal title="Add new event" visible={show} onCancel={handleClose} onOk={onFinish} className="modal">
        <Form  {...formItemLayout} className="addform">
            <Form.Item name="range-time-picker" label="Time"  >
              <Checkbox onChange={allDay_onChange} disabled={todo} >All Day</Checkbox>
              <Popover placement="rightBottom" content={"Todo events don't need specified time until being dragged to calendar"}>
              <Checkbox onChange={todo_onChange} >Todo</Checkbox>
              </Popover>
              <Time></Time>
            </Form.Item>

            <Form.Item /*name="color"*/ label="Color" rules={[{ required: true, message: 'Please select color!' }]}>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                {colorStr}<DownOutlined />
              </a>
            </Dropdown>
            </Form.Item>
      
            <Form.Item label="Favorite">
              <Popover placement="right" content={"Favorite events will be shown on Home page"}>
              <Switch checkedChildren={<HeartOutlined />} onChange={fav_onChange} disabled={todo}/>
              </Popover>
            </Form.Item>

            <Form.Item
                label="Title"
                /*name="title"*/
                rules={[{ required: true, message: 'Please input your title!' }]}
            >
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>

            <Form.Item
            wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 8 },
            }}
            >
            </Form.Item>
        </Form>
      </Modal>
    );
};

export default AddForm


/*
<Radio.Group
              options={colorOptions}
              onChange={color_onChange}
              value={color}
              optionType="button"
              //disabled={todo}
              />
*/