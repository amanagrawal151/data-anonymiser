import React, { useRef, useState } from "react";


const FileUploader = () => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    // You can call your upload logic here
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
          onClick={() => {
            // Add your upload logic here
            alert(selectedFile ? `Uploading: ${selectedFile.name}` : "No file selected");
          }}
        >
          Upload
        </button>
        <div className="file-input-corners"></div>
      </div>
    </div>
  );
};

export default FileUploader;