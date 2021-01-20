import Account from '../models/Account'
import Event from '../models/Event'

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

exports.GetAccounts = async ( req, res ) =>{
    Account.find({}, (err, Accs) => {
        if (err) {
            res.status(500).json({message: 'error', accounts: []});
        }
        else{
            res.status(200).json({message: 'success', accounts: Accs});
        }
    });
}

exports.FindAccount = async (req, res) =>{
    //console.log(req.query.acc);
    const account = await Account.find({
        account: req.query.acc
    })
    //console.log(account[0]);
    if(account.length===1){
        res.status(200).json({ accountId: account[0]._id});
    }else{
        res.status(500).json({ accountId: null});
    }
}

exports.AddFirstEvent = async ( req, res ) =>{
    Event.insertMany([
        req.body.params.event
    ]).then(function(){
        res.status(200).json({message: 'success'});
    }).catch(function(){
        res.status(500).json({message: 'error'});
    })
}

exports.ConfirmAccount = async( req, res) => {
    const account = await Account.find({
        account: req.query.myAccount,
        password: req.query.pwd
    })
    if(account.length===0){
        res.status(200).json({message: 'error', myAcc:null});
    }else{
        res.status(200).json({message: 'success', myAcc: account[0]});
    }
}
