import React from "react";
import { FileTextTwoTone } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

//define the props that need to send to component
const props = {
  name: "file",
  multiple: false, // discard multiple files upload
  accept: ".png", //specified the allowed file types in here
  action: "http://localhost:5001/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

// pass the props to functional component
const App = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <FileTextTwoTone twoToneColor="red" />
    </p>
    <p className="ant-upload-text">
      Click or drag your file to this area to upload
    </p>
    <p className="ant-upload-hint">
      You are allowed Only .PNG format images to upload. Make sure you are
      uploading exact type of images before extraction of text
    </p>
  </Dragger>
);
export default App;
