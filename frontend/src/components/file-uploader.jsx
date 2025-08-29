const FileUploader = () => {
  return (
    <div style={{ width: "600px" }}><div class="file-input file-input-xl">
 <div class="file-input-corners"></div>
  <em class="file-input-icon icon icon-xl">attach_file</em>
  <h4 class="file-input-title">Add attachment</h4>
  <p class="file-input-text">
  Drag or
    <label for="fileInput" class="file-input-link">select</label>
    your file to this area to upload
  </p>
  <label for="fileInputA" class="btn btn-discreet-secondary file-input-button">Select file</label>
  <input class="d-none" type="file" name="fileInput" id="fileInput" />
  <div class="file-input-corners"></div>
  </div></div>
  );
};

export default FileUploader;
