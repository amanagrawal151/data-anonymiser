
import FileUploader from "../components/file-uploader";
import Stepper from "../components/Stepper";
import UploadStatus from "../components/upload-status";

const Home = () => {
    return (
        <div>
            <FileUploader />
            <UploadStatus />
            <Stepper />
        </div>
    );
};

export default Home;