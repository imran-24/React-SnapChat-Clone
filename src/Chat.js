import { Avatar } from '@material-ui/core'
import React from 'react'
import './Chat.css'
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import ReactTimeago from 'react-timeago';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setImage } from './features/appSlice';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';

function Chat({id, profilePic, userName, timestamp, read, imageUrl}) {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const open = () => {
    if(!read){
        dispatch(setImage(imageUrl));
        db.collection('posts').doc(id).set(
            {
                read: true,
            },
            {
                merge: true
            }    
        );
        navigate('/chats/view');
    }
  }
  return (
    <div onClick={open} className='chat'>
        <Avatar src={user?.photoUrl} className='chat__avater' />
        <div className="chat__info">
            <h4>Imran Syam</h4>
            <p>{!read && "Tap to view -"} {" "} <span> {<ReactTimeago date={new Date(timestamp?.toDate()).toUTCString()} /> }</span> </p>
        </div>
        {!read && <StopRoundedIcon className='chat__readIcon' />}
    </div>
  )
}

export default Chat