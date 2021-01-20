import Account from '../models/Account'
import moment from 'moment';

exports.AddAccount = async ( req, res ) =>{
    const repeatAcc = await Account.find({
        account: req.body.params.account
    })
    
    if(repeatAcc.length > 0){
        res.status(200).json({message: 'repeat'});
        return;
    }

    Account.insertMany([
        req.body.params
    ]).then(function(){
        res.status(200).json({message: 'success'});
    }).catch(function(){
        res.status(500).json({message: 'error'});
    })
}

exports.SubmitAccount = async ( req, res ) =>{
    console.log(req.query);
    const acc = await Account.find({
        account: req.query.myAccount,
        password: req.query.pwd
    })
    if(acc.length === 1){
        res.status(200).json({message: 'success' , accountInfo: acc[0]});
    }else{
        res.status(500).json({message: 'error', accountInfo: null});
    }
}