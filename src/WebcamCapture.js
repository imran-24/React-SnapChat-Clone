import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { selectedImage, setImage } from "./features/cameraSlice";
import { Redirect, useNavigate } from 'react-router-dom'
import './WebcamCapture.css';
const videoConstraints = {
    width: 300,
    height: 500,
    facingMode: "user"
  };


  
  function WebcamCapture() {
    

    const capturedImage = useSelector(selectedImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
      () => {
        const imageSrc = webcamRef.current.getScreenshot();
        
        dispatch(setImage(
            {
                image: imageSrc,
            }
        ));
        navigate('/preview')
        
      },
      [webcamRef]
    );

    return (
      <div className="webcamCapture">
        <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      
      
       <RadioButtonUncheckedIcon className="webcam__button" onClick={capture} fontSize="large" />
    
      
      
      
      </div>
    )
  }
  
  export default WebcamCapture
  
 