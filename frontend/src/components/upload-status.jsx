
const UploadStatus = ({ fileName, uploadStatus }) => {
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
            <span className="file-uploading-size">{uploadStatus || "Uploading"} (60%)</span>
          </div>
          <div className="file-uploading-progress bg-black bg-opacity-10">
            <div className="h-100 bg-black" style={{ width: "60%" }}></div>
          </div>
        </div>
        <button className="file-uploading-button btn btn-lg btn-flat-light">
          <em className="icon">close</em>
        </button>
      </div>
    </div>
  );
};

export default UploadStatus;