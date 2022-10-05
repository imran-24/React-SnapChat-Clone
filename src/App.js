import React, { useEffect } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from "react-router-dom";


import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';

function App() {
  
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  


  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
          dispatch(
            login({
              email: user.email,
              displayName: user.displayName,
              id: user.uid,
              photoUrl: user.photoURL
          }));

      }else{
        dispatch(logout());
      }
    })
  },[])

  return (
    <Router>

      <div className="app">
        {!user ? <Login />
                : 
                <>
                  <img className='icon' src="data:image/png;base64,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" alt="" />
                  <div className='app__body'>
                    <div className="app__body__background">
                      <Routes>
                      
                      <Route path='/' element={ <WebcamCapture /> } />
                      <Route path='/preview' element={ <Preview /> } />
                      <Route path='/chats' element={ <Chats /> } />
                      <Route path='/chats/view' element={ <ChatView /> } />

                    </Routes>  
                    </div>
        
                    
          
          
          
                  </div>
                </>
                
              
        }
              
        
              
            
        
        
      </div>
      
      
    </Router>
      
  );
}

export default App;


