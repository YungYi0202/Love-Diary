import Event from '../models/Event'
import moment from 'moment';

exports.GetEvents = async ( req, res ) =>{
    //console.log("in GetEvents: accountId="+req.query.accountId);
    Event.find({
        accountId: req.query.accountId,
        todo: false
        }, (err, Events) => {
        if (err) {
          console.error(err);
          res.status(403).json({message: 'error', events: []});
        }
        else{
            res.status(200).json({message: 'success', events: Events});
        }
    });
}

exports.AddEvent = async ( req, res ) =>{
    req.body.params.addInfo.event.todo = false;
    req.body.params.addInfo.event.accountId = req.body.params.accountId;
    req.body.params.addInfo.event.favorite = req.body.params.favorite;
    Event.insertMany([
        req.body.params.addInfo.event
    ]).then(function(){
        res.status(200).json({message: 'success', event: req.body.params.addInfo.event});
    }).catch(function(){
        res.status(500).json({message: 'error', event:null});
    })
}

exports.RemoveEvent = async (req, res) =>{
    //console.log("removeInfo:"+req.body.params._id);
    Event.deleteOne({
        "_id" : req.body.params._id
    }).then(function(){
        res.status(200).json({message: 'success'});
    }).catch(function(){
        res.status(500).json({message: 'error'});
    })
}

exports.DropEvent = async (req, res) =>{
    Event.updateOne({
        "_id" : req.body.params._id
    },{
        "$set" : {"start" : req.body.params.newStart , "end" : req.body.params.newEnd}
    }).then(function(){
        res.status(200).json({message: 'success'});
    }).catch(function(){
        res.status(500).json({message: 'error'});
    })
}

exports.GetDayEvents = async ( req, res ) =>{
    Event.find({
        $and:[
            {accountId: req.query.accountId},
            {todo: false},
            {$or:[
                {$and:[{ start: {$gte: req.query.dayStart} },{end: {$lte: req.query.dayEnd}}]},
                {$and:[{ start: {$lt: req.query.dayStart} },{end: {$gt: req.query.dayStart}}]},
                {$and:[{ start: {$lt: req.query.dayEnd} },{end: {$gt: req.query.dayEnd}}]}
            ]}
        ]
        }, (err, Events) => {
        if (err) {
          console.error(err);
          res.status(403).json({message: 'error', events: []});
        }
        else{
            res.status(200).json({message: 'success', events: Events});
        }
    });
    /*Event.find({
        $or:[
            {$and:[{ start: {$gte: req.query.dayStart} },{end: {$lte: req.query.dayEnd}}]},
            {$and:[{ start: {$lt: req.query.dayStart} },{end: {$gt: req.query.dayStart}}]},
            {$and:[{ start: {$lt: req.query.dayEnd} },{end: {$gt: req.query.dayEnd}}]}
        ]}, (err, Events) => {
        if (err) {
          console.error(err);
          res.status(403).json({message: 'error', events: []});
        }
        else{
            res.status(200).json({message: 'success', events: Events});
        }
    });*/
    
}

exports.ReceiveEvent = async ( req, res ) =>{
    const endStr = moment(req.body.params.event.start).add(1,"days").format("YYYY-MM-DD");
    req.body.params.event.end = endStr;
    req.body.params.event.textColor = "white";
    req.body.params.event.accountId = req.body.params.accountId;
    req.body.params.event.todo = false;
    req.body.params.event.favorite = false;
    Event.insertMany([
        req.body.params.event
    ]).then(function(){
        res.status(200).json({message: 'success'});
    }).catch(function(){
        res.status(500).json({message: 'error'});
    })
}

exports.GetTodoEvents = async ( req, res ) =>{
    //console.log("in GetEvents: accountId="+req.query.accountId);
    Event.find({
        accountId: req.query.accountId,
        todo: true
        }, (err, Events) => {
        if (err) {
          console.error(err);
          res.status(403).json({message: 'error', events: []});
        }
        else{
            res.status(200).json({message: 'success', events: Events});
        }
    });
}

exports.AddTodoEvent = async ( req, res ) => {
    var todoEvent = {
        accountId: req.body.params.accountId, 
        title: req.body.params.event.title,
        todo: true,
        color: req.body.params.event.color,
        favorite: false
    }
    Event.insertMany([
        todoEvent
    ]).then(function(){
        res.status(200).json({message: 'success', todoEvent: todoEvent});
    }).catch(function(){
        res.status(500).json({message: 'error', todoEvent: null});
    })
}

