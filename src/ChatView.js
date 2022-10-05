import React, { useEffect } from 'react'
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import './ChatView.css';
import { resetImage, selectImage } from './features/appSlice'

function ChatView() {

  const viewImage = useSelector(selectImage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect( () => {
    if(!viewImage){
      exit();
    }
  }, [viewImage]);

  const exit = () => {
    dispatch( resetImage(null));
    navigate('/chats');
  }
  return (
    <div className='chatview'>
        <div className="chatview__timer">
          <CountdownCircleTimer 
            isPlaying
            duration={10}
            size={50}
            strokeWidth={6}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
          >
            {({ remainingTime }) => 
              {
                if(remainingTime === 0){
                  exit();
                }
                return remainingTime;
              }
            }
          </CountdownCircleTimer>
        </div>
        <img src={viewImage} onClick={exit} alt="" />
        
        
    </div>
  )
}

export default ChatView