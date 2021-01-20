import moment from 'moment';
import Content from '../models/Content'
import Photo from '../models/Photo'

exports.GetContent = async ( req, res ) =>{
    //console.log(req.query.accountId);
    //console.log(req.query.dateStr);
    const contents = await Content.find({
        accountId: req.query.accountId,
        date: req.query.dateStr
    });
    //console.log(contents);
    if(contents.length===0){
        res.status(200).json({msg: 'empty', content: null});
    }else{
        res.status(200).json({msg: 'exist', content: contents[0]});
    }     
}

exports.AddContent = async (req, res) => {
    var content = {
        accountId: req.body.params.accountId,
        date: req.body.params.dateStr,
        mood: req.body.params.mood,
        text: req.body.params.text,
        photoText: req.body.params.photoText
    }
    //console.log("AddContent");
    //console.log(content);
    Content.insertMany([
        content
    ]).then(function(){
        res.status(200).json({msg: 'success'});
    }).catch(function(){
        res.status(500).json({msg: 'error'});
    })
}

exports.UpdateContent = async (req, res) => {
    //console.log("UpdateContent.photoText");
    //console.log(req.body.params.photoText);
    Content.updateOne({
        "accountId": req.body.params.accountId,
        "date": req.body.params.dateStr,
    },{
        "$set" : {"mood" : req.body.params.mood , "text" : req.body.params.text, "photoText" : req.body.params.photoText}
    }).then(function(){
        res.status(200).json({msg: 'success'});
    }).catch(function(){
        res.status(500).json({msg: 'error'});
    })
}

exports.GetPhoto = async ( req, res ) =>{
    //console.log(req.query.accountId);
    //console.log(req.query.dateStr);
    const photo = await Photo.find({
        accountId: req.query.accountId,
        date: req.query.dateStr,
    });
    //console.log(contents);
    if(photo.length===0){
        res.status(200).json({message: 'empty', url: null});
    }else{
        res.status(200).json({message: 'exist', url: photo[0].photoURL});
    }     
}


exports.AddPhoto = async (req, res) => {
    var photo = {
        accountId: req.body.params.accountId,
        date: req.body.params.dateStr,
        photoURL: req.body.params.photoURL
    }
    // console.log("AddPhoto:")
    // console.log(photo)
    Photo.insertMany([
        photo
    ]).then(function(){
        res.status(200).json({message: 'success'});
    }).catch(function(){
        res.status(500).json({message: 'error'});
    })
}

exports.UpdatePhoto = async (req, res) => {
    Photo.updateOne({
        "accountId": req.body.params.accountId,
        "date": req.body.params.dateStr,
    },{
        "$set" : {"photoURL" : req.body.params.photoURL}
    }).then(function(){
        res.status(200).json({message: 'success'});
    }).catch(function(){
        res.status(500).json({message: 'error'});
    })
}