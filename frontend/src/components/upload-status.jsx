const UploadStatus = ({ fileName, uploadStatus, fileSize, progress = 0, onClose, downloadUrl }) => {
  // Helper to format file size
  const formatSize = (size) => {
    if (!size) return '';
    if (size < 1024) return size + ' B';
    if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
    return (size / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (uploadStatus === 'uploaded') {
    return (
      <div style={{ width: "600px" }}>
        <div className="file-upload file-upload-md">
          <div className="file-upload-icon">
            <svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H23L38 15V48H0V0ZM10 27.5L11.5 26L16 30.5L26.5 20L28 21.5L16 33.5L10 27.5Z" fill="black" stroke="currentColor"></path>
            </svg>
          </div>
          <div className="file-upload-text">
            <div className="file-upload-text-content d-flex justify-content-between">
              <span className="file-upload-title">{fileName}</span><br />
              <span className="file-upload-size">{formatSize(fileSize)}</span>
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            <span className="text-info align-self-center">File uploaded. Processing...</span>
            <button className="file-upload-button btn btn-lg btn-flat-light" onClick={onClose}>
              <em className="icon">close</em>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (uploadStatus === 'failed') {
    return (
      <div style={{ width: "600px" }}>
        <div className="file-upload-error file-upload-md">
          <div className="file-upload-error-icon">
            <svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 29H20V31H18V29ZM18 21H20V27H18V21ZM18.99 16C13.47 16 9 20.48 9 26C9 31.52 13.47 36 18.99 36C24.52 36 29 31.52 29 26C29 20.48 24.52 16 18.99 16ZM19 34C14.58 34 11 30.42 11 26C11 21.58 14.58 18 19 18C23.42 18 27 21.58 27 26C27 30.42 23.42 34 19 34Z" fill="#DB392D"></path>
              <path fillRule="evenodd" clipRule="evenodd" d="M22.1716 2H2V46H36V15.8284L22.1716 2ZM23 0H0V48H38V15L23 0Z" fill="#DB392D"></path>
            </svg>
          </div>
          <div className="file-upload-error-text">
            <div className="file-upload-error-text-content ">
              <span className="file-upload-error-title">{fileName}</span><br />
              <span className="file-upload-error-size">Failed to upload</span>
            </div>
          </div>
          <button className="file-upload-error-button btn btn-lg btn-flat-light" onClick={onClose}>
            <em className="icon">close</em>
          </button>
        </div>
      </div>
    );
  }

  if (uploadStatus === 'ready') {
    return (
      <div style={{ width: "600px" }}>
        <div className="file-upload file-upload-md">
          <div className="file-upload-icon">
            <svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H23L38 15V48H0V0ZM10 27.5L11.5 26L16 30.5L26.5 20L28 21.5L16 33.5L10 27.5Z" fill="black" stroke="currentColor"></path>
            </svg>
          </div>
          <div className="file-upload-text">
            <div className="file-upload-text-content d-flex justify-content-between">
              <span className="file-upload-title">{fileName}</span><br />
              <span className="file-upload-size">{formatSize(fileSize)}</span>
            </div>
          </div>
          <div className="d-flex gap-2 mt-3">
            {downloadUrl ? (
              <a
                href={downloadUrl}
                className="btn btn-success btn-lg"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <em className="icon">download</em> Download File
              </a>
            ) : (
              <span className="text-warning align-self-center">Processing complete. Download link not available.</span>
            )}
            <button className="file-upload-button btn btn-lg btn-flat-light" onClick={onClose}>
              <em className="icon">close</em>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default: uploading
  return (
    <div style={{ width: "600px" }}>
      <div className="file-uploading file-upload-md">
        <div className="file-uploading-icon">
          <svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 22L12.41 23.41L18 17.83V30H20V17.83L25.58 23.42L27 22L19 14L11 22Z" fill="currentColor"></path>
            <path d="M18 32H20V34H18V32Z" fill="black"></path>
            <path d="M18 36H20V38H18V36Z" fill="black"></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M22.1716 2H2V46H36V15.8284L22.1716 2ZM23 0H0V48H38V15L23 0Z" fill="currentColor"></path>
          </svg>
        </div>
        <div className="file-uploading-text">
          <div className="file-uploading-text-content d-flex justify-content-between">
            <span className="file-uploading-title">{fileName || "Uploading file..."}</span><br />
            <span className="file-uploading-size">{progress}%</span>
          </div>
          <div className="file-uploading-progress bg-black bg-opacity-10">
            <div className="h-100 bg-black" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <button className="file-uploading-button btn btn-lg btn-flat-light" onClick={onClose}>
          <em className="icon">close</em>
        </button>
      </div>
    </div>
  );
};

export default UploadStatus;