import Login from '../components/Login/Login'
import Start from '../components/Start/Start'
import Book from './MyBook'
import React , {useState}from "react";
import './App.css';

function App(){
    const [hasStarted, setHasStarted] = useState(false);
    const [hasLogined, setHasLogined] = useState(false);
    const [accountInfo, setAccountInfo] = useState(null);
    
    const handleStart = () => {
        setHasStarted(true);
    }

    const loginSuccess = (acc_id, name1, name2, date) =>{
        var acc = {
            accountId: acc_id,
            name1: name1,
            name2: name2,
            startDate: date
        }
        setAccountInfo(acc);
        setHasLogined(true);
    }

    return (
        <div>
            {hasStarted ?
                hasLogined?
                <Book accountInfo={accountInfo} ></Book>
                :
                <Login loginSuccess={loginSuccess}></Login>
            : 
            <Start handleStart={handleStart}></Start>
            } 
        </div>
    )
}
export default App
