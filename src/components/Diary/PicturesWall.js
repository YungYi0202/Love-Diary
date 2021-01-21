import {React, useState, useEffect} from 'react';
import axios from 'axios'
import {SyncOutlined } from '@ant-design/icons';
const API_ROOT = 'http://love-diary.anyday.com.tw:4000/api'
const instance = axios.create({
  baseURL: API_ROOT
})
export default function PicturesWall({dateStr, accountId, photoText, photoText_onChange}){
  const [imageUrl, setImageUrl] = useState("");
  const [isInDatabase, setIsInDatabase] = useState(false);
  
    const _getPhoto = async() =>{
        const {
            data: { message, url}
        } = await instance.get('/getPhoto',{ params: { accountId, dateStr}});
        //console.log("backend url:");
        //console.log(url);
        if(message==="exist"){
            //console.log("getPhoto");
            setImageUrl(url);
            setIsInDatabase(true);
        }else{
            setImageUrl("");
            setIsInDatabase(false);
        }
    }

    const _addPhoto = async(photoURL)=>{
      const {
          data: { message}
      } = await instance.post('/addPhoto',{ params: { accountId, dateStr, photoURL}});
      if(message==="success") setIsInDatabase(true);
    }

    const _updatePhoto = async(photoURL)=>{
      const {
          data: { message}
      } = await instance.post('/updatePhoto',{ params: { accountId, dateStr, photoURL}});
      if(message === "error") alert("update photo error")
    }

    useEffect(()=>{
      if(dateStr!==undefined){
          //console.log("useEffect");
          _getPhoto();
      }
    },[dateStr]);

    
  const uploadImage = ({}) => {
    if(window.confirm("Upload ?")){
      const r = new XMLHttpRequest()
      const d = new FormData()
      const e = document.getElementsByClassName('input-image')[0].files[0]
      var u

      d.append('image', e)

      r.open('POST', 'https://api.imgur.com/3/image/')
      r.setRequestHeader('Authorization', `Client-ID 4e3b0d0edce7854`)
      r.onreadystatechange = function () {
        if(r.status === 200 && r.readyState === 4) {
          let res = JSON.parse(r.responseText)
          u = `https://i.imgur.com/${res.data.id}.png`
        }      
        setImageUrl(u);
        //console.log("url:"+u);
        if(u!=="" && u!==undefined && u!==null){
          if(isInDatabase){
            //console.log("_update")
            _updatePhoto(u);
          }else{
            //console.log("_add")
            _addPhoto(u);
          }
        }
        
      }
      r.send(d);
    }  
  }

  return (
    <div>
      <label className="uploadPhoto">
        {imageUrl? 
          <input type="button" className="butn font_s" value="Change Photo !"/>:
          <input type="button" className="butn font_s" value="Upload Photo !"/>
        }
        <input type="file" className="input-image" onChange={uploadImage}/>
      </label>
      {imageUrl? <img className="photo midd" alt="photo" src={imageUrl}/>:<></>}
      <div className="pic_contect_back"></div>
      <textarea value={photoText} onChange={photoText_onChange} className="pic_contect font_F" placeholder="Someting about the photo..."></textarea>
    </div>
  );
}