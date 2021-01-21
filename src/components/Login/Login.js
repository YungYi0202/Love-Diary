import React , { useState, useEffect }from "react";
import CryptoJs from 'crypto-js';
import SignUpButton from './SignUpButton'
import moment from 'moment';
import Fade from '@material-ui/core/Fade';
import "./Login.css"

import axios from 'axios'

const API_ROOT = 'http://love-diary.anyday.com.tw:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})

function Login({loginSuccess}){
    const[myAccount, setAccount] = useState("");
    const[myPassword, setPassword] = useState("");
    //const[allAccounts, setAllAccounts] = useState([]);
    //const[updateAccounts, setUpdateAccounts] = useState(0);
    const[initAcc, setInitAcc] = useState(null);
    
    const addAccount = async(acc, pw, name1, name2, date) =>{
        var newAcc = {
            account: acc,
            password: pw,
            name1: name1,
            name2: name2,
            date: date
        } 
        const {
            data: { message}
        } = await instance.post('/addAccount', { params: newAcc });
        
        if(message === "success" ){
            setInitAcc(newAcc);
        }
        return message;
    }

    const handleSubmit = async() => {
        if(myAccount === "" || myPassword === ""){
            alert("Please enter your Account Name and Password")
        }else{
            //console.log("handleSubmit");
            const pwd = CryptoJs.MD5(myPassword).toString();           
            const {
                data: { message, myAcc}
            } = await instance.get('/confirmAccount', {params:{myAccount, pwd}})
            //console.log("message:" + message);
            if(message==="error"){
                alert("Your Account Name or Password is wrong!");
            }else{
                loginSuccess(myAcc._id, myAcc.name1, myAcc.name2, myAcc.date);
            }
        }
    }

    const initAccount = async()=>{
        if(initAcc !== null){
            var acc = initAcc.account;
            const {
                data: { accountId}
            } = await instance.get('/findAccount', { params: {acc} });
            //console.log(accountId);
            const end = moment(initAcc.date).add(1,"days").format("YYYY-MM-DD");
            var event = {
                accountId:accountId, 
                title: "First Day",
                favorite: true,
                todo: false,
                start: initAcc.date,
                end: end,
                textColor: "white",
                backgroundColor:"#F6919D",
                borderColor:"#F6919D"
            }
            const {
                data: { message }
            } = await instance.post('/addFirstEvent', { params: { event } });
            if(message==="error") console.log("initAccount error");
        }
    }

    useEffect(()=>{
        initAccount();
    },[initAcc]);
    
    return(
        <Fade in={true} {...({ timeout: 1500 } )}>
        <div className="closedBook">
            <p className="login_title">Login</p>
            <form>
                <div className="acc_pas">
                    <label htmlFor="account" className="account"></label>
                    <input type="text" name="account" id="account" className="login_type"
                        value={myAccount}
                        onChange={(e) => setAccount(e.target.value)}
                        placeholder="Account"
                    ></input>
                    <p></p>
                    <label htmlFor="password" className="password"></label>
                    <input type="password" name="password" id="password" className="login_type"
                        value={myPassword}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    ></input>
                </div>
                <button onClick={handleSubmit} type="button" className="open" >Open</button>
                <SignUpButton addAccount={addAccount}></SignUpButton>
            </form>
        </div>
        </Fade>
    )
    
}
export default Login;

