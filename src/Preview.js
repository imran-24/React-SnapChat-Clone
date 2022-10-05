import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { resetImage, selectedImage } from './features/cameraSlice'
import CloseIcon from '@material-ui/icons/Close';
import './Preview.css'
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import DescriptionIcon from '@material-ui/icons/Description';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import {v4 as uuid} from 'uuid';
import { db, storage } from './firebase';
import firebase from 'firebase/compat/app';
import { selectUser } from './features/appSlice';

function Preview() {
  
  const navigate = useNavigate();
  const capturedImage = useSelector(selectedImage);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect( () => {
    if(!capturedImage){
        navigate('/');
    }
  },[capturedImage]);

  const close = () => {
    dispatch(resetImage(null),
    [capturedImage]);
    navigate(-1);
  }

  const sendPost = () => {
    const id = uuid();
    const uploadTask = storage.ref(`posts/${id}`)
                              .putString(capturedImage?.image, 'data_url');
                              
    uploadTask.on(
    'state_changed',
    null, 
    (error) => {
        console.log(error)
    },
    () => {
        storage
        .ref('posts')
        .child(id)
        .getDownloadURL()
        .then( (url) => {
            db.collection('posts').add({
                imageUrl : url,
                username : user.displayName,
                email : user.email,
                read     : false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            navigate('/chats')
        })

    });
  }

  return (
    <div className='preview'>
        <CloseIcon onClick={close} className='preview__close' />
        <div className="preview__toolbarRight">
            <TextFieldsIcon className='icon' />
            <CreateIcon className='icon' />
            <DescriptionIcon className='icon' />
            <MusicNoteIcon className='icon' />
            <AttachFileIcon className='icon' />
            <CropIcon className='icon' />
            <TimerIcon className='icon' />
        </div>
        <img src={capturedImage?.image} alt="" />
        <div onClick={sendPost} className="preview__sendNow">
            <h2>Send Now</h2>
            <SendIcon fontSize='small' className='preview__sendIcon'/>
        </div>
    </div>
  )
}

export default Preview