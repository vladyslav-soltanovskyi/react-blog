import { useRef } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Button from "./Button";

const FileUploader = ({ handleFile, isLoading = false, progress = 0 }) => {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };

  return (
    <>
      <Button
        className="button-upload"
        fullWidth
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading && (
          <div
            className="progress-file"
            style={{ width: `${progress}%` }}
          ></div>
        )}
        <FileUploadOutlinedIcon />
        {isLoading ? "Загрузка..." : "Загрузить"}
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        className="file-input"
      />
    </>
  );
};
export default FileUploader;
