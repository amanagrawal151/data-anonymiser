import "./App.css";
import "@sg-bootstrap/icons/dist/index.css";
import '@sg-bootstrap/core/dist/css/sg-bootstrap-standard.min.css';
import Navbar from "./components/navbar";
import FileUploader from "./components/file-uploader";
const App = () => {
  return (
    <>
    <Navbar />
    <FileUploader />
    </>
  );
};

export default App;

