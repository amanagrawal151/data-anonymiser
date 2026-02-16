import React, { useRef, useState } from "react";
import UploadStatus from "./upload-status";


const FileUploader = ({ onUpload, onProgress, setDownloadUrl: setDownloadUrlProp }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null); // 'uploading', 'uploaded', 'failed'
  const [processingStatus, setProcessingStatus] = useState(null); // 'processing', 'processed', 'failed'
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [columns, setColumns] = useState(""); // New state for columns
  const [showColumnsInput, setShowColumnsInput] = useState(false); // New state to control columns input visibility


  const handleFileChange = (e) => {
    console.log('[FileUploader] File selected:', e.target.files[0]?.name, e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };

  // Helper to parse columns string to array
  const parseColumns = (str) => {
    return str
      .split(',')
      .map(s => s.trim().replace(/^"|"$/g, ''))
      .filter(Boolean);
  };

  const uploadAndCrypt = async (action) => {
    if (!selectedFile) return;
    setUploadStatus('uploading');
    setProcessingStatus(null);
    setUploadProgress(0);
    setDownloadUrl(null);
    if (onProgress) onProgress('uploading', 0, selectedFile.name);
    try {
      // 1. Call backend to get pre-signed URL
      console.log('[FileUploader] Requesting pre-signed upload URL...');
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
        console.error('[FileUploader] Failed to get upload URL:', res.status, await res.text());
        setUploadStatus('failed');
        if (onProgress) onProgress('failed', 0, selectedFile.name);
        alert('Failed to get upload URL');
        return;
      }
      const { url, key } = await res.json();
      console.log('[FileUploader] Received upload URL and key:', url, key);
      // 2. Upload file to S3 with progress
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-Type', selectedFile.type || 'application/octet-stream');
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) {
            const percent = Math.round((e.loaded / e.total) * 100);
            setUploadProgress(percent);
            if (onProgress) onProgress('uploading', percent, selectedFile.name);
            console.log(`[FileUploader] Upload progress: ${percent}%`);
          }
        };
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log('[FileUploader] File uploaded to S3 successfully.');
            setUploadProgress(100);
            setUploadStatus('uploaded');
            if (onProgress) onProgress('uploaded', 100, selectedFile.name);
            resolve();
          } else {
            console.error('[FileUploader] S3 upload failed:', xhr.status, xhr.statusText);
            setUploadStatus('failed');
            if (onProgress) onProgress('failed', uploadProgress, selectedFile.name);
            alert('Failed to upload file to S3');
            reject();
          }
        };
        xhr.onerror = () => {
          console.error('[FileUploader] S3 upload error:', xhr.status, xhr.statusText);
          setUploadStatus('failed');
          if (onProgress) onProgress('failed', uploadProgress, selectedFile.name);
          alert('Failed to upload file to S3');
          reject();
        };
        xhr.send(selectedFile);
      });
      // 3. Call crypt API
      setProcessingStatus('processing');
      console.log(`[FileUploader] Calling crypt API (${action}) for key:`, key);
      let cryptRes;
      const columnsArray = parseColumns(columns);
      if (action === 'encrypt') {
        cryptRes = await fetch('http://localhost:3000/api/crypt/encrypt-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, fileName: selectedFile.name, fileType: selectedFile.type || 'application/octet-stream', columns: columnsArray })
        });
      } else {
        cryptRes = await fetch('http://localhost:3000/api/crypt/decrypt-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, fileName: selectedFile.name, fileType: selectedFile.type || 'application/octet-stream', columns: columnsArray })
        });
      }
      if (!cryptRes.ok) {
        console.error('[FileUploader] Crypt API failed:', cryptRes.status, await cryptRes.text());
        setProcessingStatus('failed-processing');
        if (onProgress) onProgress('failed-processing', 100, selectedFile.name);
        alert('Failed to process file');
        return;
      }
      const { url: downloadUrlFromApi } = await cryptRes.json();
      console.log('[FileUploader] Received download URL from crypt API:', downloadUrlFromApi);
      setDownloadUrl(downloadUrlFromApi);
      if (typeof setDownloadUrlProp === 'function') {
        setDownloadUrlProp(downloadUrlFromApi);
      }
      setProcessingStatus('processed');
      if (onProgress) onProgress('processed', 100, selectedFile.name);
      if (onUpload) onUpload(selectedFile.name);
      console.log('[FileUploader] File processing complete. Ready to download.');
    } catch (err) {
      console.error('[FileUploader] Unexpected error during upload or processing:', err);
      setProcessingStatus('failed');
      if (onProgress) onProgress('failed-processing', 0, selectedFile.name);
      alert('An unexpected error occurred during upload or processing.');
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
      {uploadStatus || processingStatus ? (
        <UploadStatus
          fileName={selectedFile?.name}
          fileSize={selectedFile?.size}
          uploadStatus={uploadStatus}
          processingStatus={processingStatus}
          progress={uploadProgress}
          downloadUrl={downloadUrl}
          onClose={() => {
            setUploadStatus(null);
            setProcessingStatus(null);
            setSelectedFile(null);
            setUploadProgress(0);
            setDownloadUrl(null);
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
            className="btn btn-primary mt-3 me-2"
            disabled={!selectedFile}
            onClick={() => uploadAndCrypt('encrypt')}
          >
             Upload & Encrypt 
          </button>
          <button
            type="button"
            className="btn btn-secondary mt-3"
            disabled={!selectedFile}
            onClick={() => uploadAndCrypt('decrypt')}
          >
             Upload & Decrypt 
          </button>
          {/* Checkbox to show/hide columns input */}
          <div className="form-group mb-3 d-flex flex-column align-items-center justify-content-center">
            <div className="form-check form-check-sm mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="chkbx"
                checked={showColumnsInput}
                onChange={e => setShowColumnsInput(e.target.checked)}
              />
              <label className="form-check-label btn-secondary" htmlFor="chkbx">
                Add custom column names to encrypt
              </label>
            </div>
            {showColumnsInput && (
              <div className="mt-3 w-100 d-flex flex-column align-items-center">
                <textarea
                  id="columnsInput"
                  className="form-control form-control-lg text-center"
                  style={{ maxWidth: '400px' }}
                  placeholder='"column1","column2","column3"...'
                  value={columns}
                  onChange={e => setColumns(e.target.value)}
                />
              </div>
            )}
          </div>
          <div className="file-input-corners"></div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;