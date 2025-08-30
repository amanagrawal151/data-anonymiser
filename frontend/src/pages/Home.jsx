import React, { useState } from "react";
import FileUploader from "../components/file-uploader";
import Stepper from "../components/Stepper";
import UploadStatus from "../components/upload-status";
import Notification from "../components/notification";

const Home = (welcomeMessage) => {
  const [showUploader, setShowUploader] = useState(true);
  const [showStatus, setShowStatus] = useState(false);
  const [stepperStep, setStepperStep] = useState(0);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [initStatus, setInitStatus] = useState("Initiating");
  const [uploadStatus, setUploadStatus] = useState("Uploading");

  // Callback for FileUploader
  const handleUpload = (fileName) => {
    setInitStatus("Initiated");
    setTimeout(() => {
      setShowUploader(false);
      setShowStatus(true);
      setUploadedFileName(fileName);
      setStepperStep(1);
      setUploadStatus("Uploaded");
    }, 500); // Simulate a short delay for status transition
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
        {welcomeMessage.welcomeMessage === true ? 
      <h1 className="display-4 fw-bold text-center mt-5 mb-4" style={{letterSpacing: '1px', color: '#2b2b6e'}}>
        Welcome back to <span style={{color: '#007bff'}}>Data Anonymizer</span>!<br/>
        <span className="fs-4 fw-normal text-secondary">Upload your files and get started.</span>
      </h1> : 
      <>
      <h1 className="display-4 fw-bold text-center mt-5 mb-4" style={{letterSpacing: '1px', color: '#2b2b6e'}}>
        upload more files on <span style={{color: '#007bff'}}>Data Anonymizer</span>!<br/>
        <span className="fs-4 fw-normal text-secondary"></span>
      </h1>
      </>
}
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 d-flex flex-column align-items-center">
          {/* <Notification /> */}
          {showUploader && <FileUploader onUpload={handleUpload} />}
          {showStatus && (
            <UploadStatus
              fileName={uploadedFileName}
              uploadStatus={uploadStatus}
            />
          )}
          <Stepper
            steps={[
              { label: initStatus },
              { label: uploadStatus },
              { label: "Processing" },
              { label: "Ready to download" },
            ]}
            current={stepperStep}
            activeColor="text-warning"
            completedColor="text-success"
            failed={null}
          />
        </div>
      </div>
      {initStatus === "Initiated" && 
      <>
        <Home welcomeMessage={false} />
      </>  }
      </div>
  );
};

export default Home;
