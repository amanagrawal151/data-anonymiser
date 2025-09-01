import React, { useRef, useState } from "react";
import UploadStatus from "./upload-status";


const FileUploader = ({ onUpload, onProgress }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null); // 'uploading', 'uploaded', 'failed'


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadToS3 = async () => {
    if (!selectedFile) return;
    setUploadStatus('uploading');
    setUploadProgress(0);
    if (onProgress) onProgress('uploading', 0, selectedFile.name);
    try {
      // 1. Call backend to get pre-signed URL
      const res = await fetch('http://localhost:3000/api/s3/sign-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: selectedFile.name,
          contentType: selectedFile.type || 'application/octet-stream',
          fileSize: selectedFile.size,
          userId: "<USER_ID> "
        }),
      });
      if (!res.ok) {
        setUploadStatus('failed');
        if (onProgress) onProgress('failed', 0, selectedFile.name);
        alert('Failed to get upload URL');
        return;
      }
      const { url } = await res.json();
      // 2. Upload file to S3 with progress
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', url, true);
      xhr.setRequestHeader('Content-Type', selectedFile.type || 'application/octet-stream');
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percent);
          if (onProgress) onProgress('uploading', percent, selectedFile.name);
        }
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadStatus('uploaded');
          setUploadProgress(100);
          if (onProgress) onProgress('uploaded', 100, selectedFile.name);
          if (onUpload) onUpload(selectedFile.name);
        } else {
          setUploadStatus('failed');
          if (onProgress) onProgress('failed', uploadProgress, selectedFile.name);
          alert('Failed to upload file to S3');
        }
      };
      xhr.onerror = () => {
        setUploadStatus('failed');
        if (onProgress) onProgress('failed', uploadProgress, selectedFile.name);
        alert('Failed to upload file to S3');
      };
      xhr.send(selectedFile);
    } catch (err) {
      setUploadStatus('failed');
      if (onProgress) onProgress('failed', 0, selectedFile.name);
      alert('An unexpected error occurred during upload.');
      console.error('Upload error:', err);
    }
  };

  const handleSelectClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      // You can call your upload logic here
    }
  };

  return (
    <div style={{ width: "600px" }}>
      {uploadStatus ? (
        <UploadStatus
          fileName={selectedFile?.name}
          fileSize={selectedFile?.size}
          uploadStatus={uploadStatus}
          progress={uploadProgress}
          onClose={() => {
            setUploadStatus(null);
            setSelectedFile(null);
            setUploadProgress(0);
          }}
        />
      ) : (
        <div
          className={`file-input file-input-xl${dragActive ? " drag-active" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="file-input-corners"></div>
          <em className="file-input-icon icon icon-xl">attach_file</em>
          <h4 className="file-input-title">Add attachment</h4>
          <p className="file-input-text">
            Drag or
            <span className="file-input-link" style={{ cursor: "pointer", color: "#007bff" }} onClick={handleSelectClick}>
              select
            </span>
            your file to this area to upload
          </p>
          <button type="button" className="btn btn-discreet-secondary file-input-button" onClick={handleSelectClick}>
            Select file
          </button>
          <input
            className="d-none"
            type="file"
            name="fileInput"
            id="fileInput"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div style={{ marginTop: "1rem" }}>
              <strong>Selected file:</strong> {selectedFile.name}
            </div>
          )}
          <button
            type="button"
            className="btn btn-primary mt-3"
            disabled={!selectedFile}
            onClick={uploadToS3}
          >
            Upload
          </button>
          <div className="file-input-corners"></div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;