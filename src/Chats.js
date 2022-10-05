import { Avatar } from '@material-ui/core'
import { ChatBubble } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react'
import Chat from './Chat'
import { auth, db } from './firebase';
import './Chats.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/appSlice';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Navigate, useNavigate } from 'react-router-dom';
import { resetImage } from './features/cameraSlice';

function Chats() {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch(selectUser);
  const navigate = useNavigate();

  useEffect(
    () => {
        db.collection('posts')
        .orderBy('timestamp', 'desc' )
        .onSnapshot(snapshot => 
            (
                setPosts(snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        data: doc.data(),
                    }
                )))
            ))
    },[])
  
    const signOut = () =>{
      dispatch(logout());
      auth.signOut();
    }

  return (
    <div  className='chats'>

        <div className="chats__header">
          <div className="chats__headerLeft">
            <Avatar src={user?.photoUrl} onClick={ () => auth.signOut() } className="avater__icon"/>
          </div>
          <div className="chats__headerMiddle">
            <SearchIcon className='search__icon'/>
            <input type="text" placeholder='Friends' />
          </div>
          <div className="chats__headerRight">
            <ChatBubble />
          </div>
        </div>

        <div className="chats__chatList">
            {posts.map(({ id, data: { profilePic, userName, timestamp,read, imageUrl  }})=>
                (<Chat
                    key={id}
                    id={id}
                    userName={userName}
                    timestamp= {timestamp}
                    read = {read}
                    profilePic={profilePic} 
                    imageUrl={imageUrl} />
                    
                ))
            }
        </div>

        <RadioButtonUncheckedIcon className="webcam__button" onClick={ () => {
            dispatch(resetImage(null))
            navigate('/') 
            }} fontSize="large" />
    </div>
  )
}

export default Chats