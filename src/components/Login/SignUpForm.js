import { Form, DatePicker, Input, Modal} from 'antd';
import { useState , useEffect} from 'react';
import moment from 'moment';
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons';
import CryptoJs from 'crypto-js';

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

function SignUpForm({show, handleClose, addAccount}){
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [timeVal, setTimeVal] = useState(null);
    const [startTime, setStartTime] = useState('');

    const time_onChange = (val, str) =>{
      setTimeVal(val);
      setStartTime(str);
    }

    const onFinish = () => {
      // Should format date value before submit.
      if(account==="" || password==="" || name1 ==="" || name2 ==="" || startTime===""){
        alert("Please fill up all the form fields")
      }else if(password!==password2){
        alert("Please enter the same password for twice")
      }else{
        const pwd = CryptoJs.MD5(password).toString();
        addAccount(account, pwd, name1, name2, startTime).then(result=>{
          if(result === "repeat"){
            alert("Account Name has been taken. Please change a new one.");
          }else{
            handleClose();
          } 
        });
      }
    };

    function PasswordCheck(){
      if(password === password2){
          return(
          <Form.Item >
            <Input id="pwCheck" value={password2} onChange={(e) => setPassword2(e.target.value)} type="password"
              prefix={<LockOutlined className="site-form-item-icon" />} 
              placeholder="enter the password again" 
            />
          </Form.Item>)
      }else{
          return(
          <Form.Item hasFeedback="false" validateStatus="error" help="password not consistent">
            <Input id="pwCheck" value={password2} onChange={(e) => setPassword2(e.target.value)} type="password"
              prefix={<LockOutlined className="site-form-item-icon" />} 
              placeholder="enter the password again" 
            />
          </Form.Item>)
      }
    }

    useEffect(() => {
      document.getElementById("pwCheck").focus();
    },[password2]);

    function disabledDate(current) {
      // Can not select days before today and today
      return current && current > moment().endOf('day');
    }

    return (
      <Modal visible={show} onCancel={handleClose} onOk={onFinish} className="modal" title="Create your own Love Diary">
        <Form  {...formItemLayout} >
            <Form.Item label="Account">
              <Input value={account} onChange={(e) => setAccount(e.target.value)} prefix={<UserOutlined className="site-form-item-icon" />} />
            </Form.Item>
            <Form.Item label="Password" >
              <Input value={password} type="password"
                onChange={(e) => setPassword(e.target.value)} 
                prefix={<LockOutlined className="site-form-item-icon" />}/>
              <PasswordCheck></PasswordCheck>
            </Form.Item>
            <Form.Item label="Names">
              <Input value={name1} onChange={(e) => setName1(e.target.value)} prefix={<SmileOutlined className="site-form-item-icon" />}/>
              <Input value={name2} onChange={(e) => setName2(e.target.value)} prefix={<SmileOutlined className="site-form-item-icon" />}/>
            </Form.Item>
            
            <Form.Item label="Anniversary">
              <DatePicker format="YYYY-MM-DD" value={timeVal} onChange={time_onChange} disabledDate={disabledDate} ></DatePicker>
            </Form.Item>
            <Form.Item
            wrapperCol={{
                xs: { span: 24, offset: 0 },
                sm: { span: 16, offset: 0 },
            }}
            >
            </Form.Item>
        </Form>
      </Modal>
    );
};

export default SignUpForm