import FileUploader from "../components/file-uploader";
import Stepper from "../components/Stepper";
import UploadStatus from "../components/upload-status";
import Notification from "../components/notification";

const Home = () => {
  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 d-flex flex-column align-items-center">
          <Notification />
          <FileUploader />
          <UploadStatus />
          <Stepper
            steps={[
              { label: "Initiated" },
              { label: "Uploaded" },
              { label: "Processing" },
              { label: "Ready to download" },
            ]}
            current={2}
            activeColor="text-warning"
            completedColor="text-success"
            failed={null} // or set to a step index to show failure
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
