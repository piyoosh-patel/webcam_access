import React, { useState } from "react";
import Webcam from "react-webcam";

const WebCamComp = () => {
  const webcamRef = React.useRef(null);
  const [capture, setCapture] = useState(null);
  const [openCam, setOpenCam] = useState(false);

  const handleCapture = () => {
    //for capture from webcam
    const imageSrc = webcamRef.current.getScreenshot();
    setCapture(imageSrc);
    setOpenCam(false);
  };

  const handleUpload = () => {
    // upload from pc
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCapture(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {openCam && (
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ display: capture ? "none" : "block" }}
          />
          <button
            onClick={handleCapture}
            className="border-2 bg-blue-600 rounded-xl px-2 py-2 text-white float-left mt-3 "
          >
            Capture
          </button>
        </div>
      )}
     
      <div className="flex justify-center mt-2">
       
        <div className="flex-col">
          {!openCam && !capture && (
            <button
              onClick={() => setOpenCam(true)}
              className="border-2 bg-blue-600 rounded-xl px-2 py-2 text-white"
            >
              Open Camera
            </button>
          )}
        </div>
        <div className="flex-col">
          {!openCam && (
            <div>
              <button
                onClick={handleUpload}
                className="border-2 bg-blue-600 rounded-xl px-2 py-2 text-white mb-9"
              >
                Upload from Computer
              </button>
              <input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>
      </div>
      {capture && (
        <div>
          <img src={capture} alt="Uploaded" />
          <button
            onClick={() => setCapture(null)}
            className="border-2 bg-blue-600 rounded-xl px-2 py-2 text-white mt-9 float-start"
          >
            Re-capture / Upload New
          </button>
        </div>
      )}
    </div>
  );
};

export default WebCamComp;
