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
  const [uploadStatus, setUploadStatus] = useState(null); // 'uploading', 'uploaded', 'failed'
  const [processingStatus, setProcessingStatus] = useState(null); // 'processing', 'processed', 'failed'
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);

  // Callback for FileUploader
  const handleUploadProgress = (status, progress, fileName) => {
    // status can be: uploading, uploaded, failed, processing, processed, failed-processing
    if (fileName) setUploadedFileName(fileName);
    if (status === 'uploading') {
      setUploadStatus('uploading');
      setProcessingStatus(null);
      setShowUploader(false);
      setShowStatus(true);
      setInitStatus("Initiated");
      setStepperStep(1);
      setStepperFailed(null);
    }
    if (status === 'uploaded') {
      setUploadStatus('uploaded');
      setStepperStep(2);
      setStepperFailed(null);
    }
    if (status === 'failed') {
      setUploadStatus('failed');
      setStepperStep(1);
      setStepperFailed(1);
    }
    if (status === 'processing') {
      setProcessingStatus('processing');
      setStepperStep(3);
      setStepperFailed(null);
    }
    if (status === 'processed') {
      setProcessingStatus('processed');
      setStepperStep(4);
      setStepperFailed(null);
    }
    if (status === 'failed-processing') {
      setProcessingStatus('failed');
      setStepperStep(3);
      setStepperFailed(3);
    }
    setUploadProgress(progress);
  };

  // Callback for FileUploader to set downloadUrl
  const handleSetDownloadUrl = (url) => {
    setDownloadUrl(url);
  };

  // Reset state on close
  const handleCloseStatus = () => {
    setShowStatus(false);
    setShowUploader(true);
    setUploadStatus(null);
    setProcessingStatus(null);
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
              fileSize={null}
              uploadStatus={uploadStatus}
              processingStatus={processingStatus}
              progress={uploadProgress}
              downloadUrl={downloadUrl}
              onClose={handleCloseStatus}
            />
          )}
          <Stepper
            steps={[
              { label: initStatus },
              { label: uploadStatus === 'uploaded' ? 'Uploaded' : uploadStatus === 'failed' ? 'Upload Failed' : 'Uploading' },
              { label: processingStatus === 'processed' ? 'Processed' : processingStatus === 'failed' ? 'Processing Failed' : 'Processing' },
              { label: 'Ready to download' },
            ]}
            current={stepperStep}
            activeColor="text-warning"
            completedColor="text-success"
            failed={stepperFailed}
          />
        </div>
      </div>
      {(initStatus === 'Initiated' && welcomeMessage.welcomeMessage === true && uploadStatus === 'uploading') &&
      <h1 className="display-4 fw-bold text-center mt-5 mb-4" style={{letterSpacing: '1px', color: '#2b2b6e'}}>
        Keep uploading multiple files on <span style={{color: '#007bff'}}>Data Anonymizer</span>!<br/>
        <span className="fs-4 fw-normal text-secondary">Don't wait until one file is processed</span>
      </h1>
      }
      {initStatus === "Initiated" && 
      <>
        <Home welcomeMessage={false} />
      </>  }
      </div>
  );
};

export default Home;
