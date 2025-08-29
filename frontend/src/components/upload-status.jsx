const UploadStatus = () => {
    return (<>
    <div style={{"width": "600px"}}><div class="file-uploading file-upload-md">
 <div class="file-uploading-icon">
<svg width="38" height="48" viewBox="0 0 38 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11 22L12.41 23.41L18 17.83V30H20V17.83L25.58 23.42L27 22L19 14L11 22Z" fill="currentColor"></path>
  <path d="M18 32H20V34H18V32Z" fill="black"></path>
  <path d="M18 36H20V38H18V36Z" fill="black"></path>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M22.1716 2H2V46H36V15.8284L22.1716 2ZM23 0H0V48H38V15L23 0Z" fill="currentColor"></path>
</svg>
</div>
    <div class="file-uploading-text">
      <div class="file-uploading-text-content d-flex justify-content-between">
        <span class="file-uploading-title">Manifesto.pdf</span><br />
        <span class="file-uploading-size">Uploading (60%)</span>
      </div>
      <div class="file-uploading-progress bg-black bg-opacity-10"><div class="h-100 bg-black" style={{"width": "60%"}}></div></div>
    </div>
    <button class="file-uploading-button btn btn-lg btn-flat-light">
      <em class="icon">close</em>
    </button>
    </div></div>
    </>)
}

export default UploadStatus;