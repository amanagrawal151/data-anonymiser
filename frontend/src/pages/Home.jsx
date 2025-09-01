import React, { useState } from "react";
import FileUploader from "../components/file-uploader";
import Stepper from "../components/Stepper";
import UploadStatus from "../components/upload-status";
import Notification from "../components/notification";

const Home = (welcomeMessage) => {
  const [showUploader, setShowUploader] = useState(true);
  const [showStatus, setShowStatus] = useState(false);
  const [stepperStep, setStepperStep] = useState(0);
  const [stepperFailed, setStepperFailed] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [initStatus, setInitStatus] = useState("Initiating");
  const [uploadStatus, setUploadStatus] = useState("uploading");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Callback for FileUploader
  const handleUploadProgress = (status, progress, fileName) => {
    setUploadStatus(status);
    setUploadProgress(progress);
    if (fileName) setUploadedFileName(fileName);
    if (status === 'uploading') {
      setShowUploader(false);
      setShowStatus(true);
      setInitStatus("Initiated");
      setStepperStep(1);
      setStepperFailed(null);
    }
    if(status === 'uploaded')
    {
      setStepperFailed(2)
      setStepperFailed(null)
    }
    if (status === 'ready') {
      setStepperStep(4);
      setStepperFailed(null);
    }
    if (status === 'failed') {
      setStepperStep(1);
      setStepperFailed(1); // Mark uploading stage as failed
    }
  };

  // Callback for FileUploader to set downloadUrl
  const handleSetDownloadUrl = (url) => {
    setDownloadUrl(url);
  };

  // Reset state on close
  const handleCloseStatus = () => {
    setShowStatus(false);
    setShowUploader(true);
    setUploadStatus("uploading");
    setUploadProgress(0);
    setUploadedFileName("");
    setDownloadUrl(null);
    setStepperStep(0);
    setStepperFailed(null);
    setInitStatus("Initiating");
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
        {welcomeMessage.welcomeMessage === true ? 
      <h1 className="display-4 fw-bold text-center mt-5 mb-4" style={{letterSpacing: '1px', color: '#2b2b6e'}}>
        Welcome back to <span style={{color: '#007bff'}}>Data Anonymizer</span>!<br/>
        <span className="fs-4 fw-normal text-secondary">Upload your files and get started.</span>
      </h1> : 
      <>
      {/* <h1 className="display-4 fw-bold text-center mb-4" style={{letterSpacing: '1px', color: '#2b2b6e'}}>
        upload more files on <span style={{color: '#007bff'}}>Data Anonymizer</span>!<br/>
        <span className="fs-4 fw-normal text-secondary"></span>
      </h1> */}
      </>
}
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 d-flex flex-column align-items-center">
          {/* <Notification /> */}
          {showUploader && <FileUploader onProgress={handleUploadProgress} onUpload={setUploadedFileName} setDownloadUrl={handleSetDownloadUrl} />}
          {showStatus && (
            <UploadStatus
              fileName={uploadedFileName}
              uploadStatus={uploadStatus}
              progress={uploadProgress}
              downloadUrl={downloadUrl}
              onClose={handleCloseStatus}
            />
          )}
          <Stepper
            steps={[
              { label: initStatus },
              { label: uploadStatus },
              { label: uploadStatus === 'ready' ? 'Processed' : 'Processing' },
              { label: 'Ready to download' },
            ]}
            current={stepperStep}
            activeColor="text-warning"
            completedColor="text-success"
            failed={stepperFailed}
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
