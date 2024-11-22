import React, { useEffect, useState } from "react";
import "../stylings/encryption.css";
import bgimg from "../images/project small banners1.jpg";
import logoimg from "../components/post office logo-black.png";
import SideBarMenuDashboard from "../components/sideBarMenuDashboard";
import Footer from "../components/Footer";
import Uploading from "../components/Uploading";
import Carosoul from "../components/Carosoul";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Encryption() {
  //get the primary key from session storage when user login
  const [primarykey, setPrimaryKey] = useState("");
  const [textExtracted, setTextExtracted] = useState("");
  const [recipentKey, setRecipentKey] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
  };

  const getExtractionData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/extracted");
      if (response.status === 200) {
        console.log(response.data); // see the extracted text in console
        setTextExtracted(response.data.extractedText); // set the extracted text in text area in frontend
      }
    } catch (error) {
      console.log("error in getting extracted text", error);
    }
  };

  //writing the function to clear text of textArea
  const clearTextArea = () => {
    setTextExtracted("");
    setRecipentKey("");
  };

  // Use useEffect to get the primary key from sessionStorage when the component mounts
  useEffect(() => {
    const key = sessionStorage.getItem("primaryKey");
    const publicKey = sessionStorage.getItem("publicKey");

    if (key) {
      setPrimaryKey(key); // Set the primary key from session storage to state
      setPublicKey(publicKey);
    }
  }, []);

  //setting the primary key to target variable using event handler
  const onchangeKey = (e) => {
    setPrimaryKey(e.target.value);
  };

  const user = sessionStorage.getItem("username");
  // start of encryption process by calling backend
  const handleEncryption = async () => {
    //taking the value from text area to send backend
    const encryptionData = {
      username: user,
      textExtracted,
      recipentKey,
      algorithm: selectedAlgorithm,
      format: selectedFormat,
    };
    //see the recieved data before send it
    // console.log(encryptionData);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/encryption",
        encryptionData
      );
      if (response.status === 200) {
        // console.log(response.data);
        const notify = () => toast(response.data.message);
        notify();
        setTextExtracted(response.data.encryptedText);
        // console.log(response.data.filePath);
        // window.open(response.data.filePath, "_blank");

        // trigger the download  of the encrypted file without opening it using  the invisible link
        if (response.data.filePath) {
          setFileUrl(response.data.filePath); // Set the path for the generated file
        } else {
          console.error("Encryption failed");
        }
      }
      // Check if encryption was successful
    } catch (error) {
      //console the error to detect the error
      console.log(error);
    }
  };
  //end of encryption process

  return (
    <div classNameName="encryptpage">
      <SideBarMenuDashboard />
      <img src={bgimg} alt="" srcset="" />
      <Carosoul />

      {/* start of header section */}
      <div className="panel1 col-md-12">
        <div className="leftside col-md-6">
          <img src={logoimg} alt="" srcset="" />
        </div>
        <div className="rightside col-md-6">
          <label for="inputAddress2" class="form-label">
            PRIMARY KEY
          </label>
          <div className="section1">
            <input
              type="text"
              className="form-control"
              value={primarykey}
              onChange={onchangeKey}
              id="inputAddress2"
              placeholder="Your Key"
            />
            <i class="bx bx-copy"></i>
          </div>
          <label for="inputAddress3" class="form-label">
            PUBLIC KEY
          </label>
          <div className="section1">
            <input
              type="text"
              className="form-control"
              value={publicKey}
              onChange={setPublicKey}
              id="inputAddress2"
              placeholder="Your Public Key"
            />
            <i
              class="bx bx-copy"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(publicKey);
                  const notify = () =>
                    toast("public key is copied to clipboard");
                  notify();
                } catch (error) {
                  console.error("Failed to copy key to clipboard", error);
                }
              }}
            ></i>
          </div>
        </div>
        {/* start bottom section design */}
        <div className="bottom col-md-12">
          <div className="bottomleft col-md-6">
            <div className="uploadbg">
              <div className="uploadfooter">
                <Uploading />
                <button class="btn btn-primary" onClick={getExtractionData}>
                  EXTRACT TEXT
                </button>
              </div>
            </div>
          </div>
          <div className="bottomright col-md-6">
            <div className="extractedtext">
              <textarea
                name="textarea1"
                value={textExtracted}
                onChange={(e) => setTextExtracted(e.target.value)} // Allow editing
                id="extracted_text-area"
                className="form-control"
                rows={25}
              ></textarea>
              {/* <input
                type="text"
                className="form-control"
                value={textExtracted}
                onChange={(e) => setTextExtracted(e.target.value)}
                id="recipentkey"
                placeholder="extracted text here"
                required
              /> */}
            </div>
            {/* recipent primary key section */}
            <div className="algorithmsection">
              <div className="algorithm">
                <label>RECIPENT PUBLIC KEY</label>
                <input
                  type="text"
                  className="form-control"
                  value={recipentKey}
                  onChange={(e) => setRecipentKey(e.target.value)}
                  id="recipentkey"
                  placeholder="Enter recipent public Key"
                  required
                />
                <i
                  class="bx bx-paste"
                  onClick={async () => {
                    try {
                      const text = await navigator.clipboard.readText();
                      setRecipentKey(text);
                      const notify = () => toast("key is pasted");
                      notify();
                    } catch (error) {
                      console.error(
                        "Failed to paste key from clipboard",
                        error
                      );
                    }
                  }}
                ></i>
              </div>
            </div>
            {/* algorithm choosing section */}
            <div className="algorithmsection">
              <div className="algorithm">
                <label>CHOOSE ENCRYPTION ALGORITHM</label>
                <button
                  type="button"
                  className={`RSA-btn ${
                    selectedAlgorithm === "RSA" ? "selected" : ""
                  }`}
                  onClick={() => handleAlgorithmChange("RSA")}
                >
                  RSA
                </button>
                <ToastContainer />
                <button
                  type="button"
                  className={`RSA-btn ${
                    selectedAlgorithm === "AES" ? "selected" : ""
                  }`}
                  onClick={() => handleAlgorithmChange("AES")}
                >
                  AES
                </button>
                <button
                  type="button"
                  className={`RSA-btn ${
                    selectedAlgorithm === "DES" ? "selected" : ""
                  }`}
                  onClick={() => handleAlgorithmChange("DES")}
                >
                  DES
                </button>
                <button
                  type="button"
                  className={`RSA-btn ${
                    selectedAlgorithm === "3DES" ? "selected" : ""
                  }`}
                  onClick={() => handleAlgorithmChange("3DES")}
                >
                  3DES
                </button>
              </div>
            </div>
            {/* document format section */}
            <div className="algorithmsection">
              <div className="algorithm">
                <label>CHOOSE OUTPUT FORMAT</label>
                <button
                  type="button"
                  className={`RSA-btn ${
                    selectedFormat === "TEXT FILE" ? "selected" : ""
                  }`}
                  onClick={() => handleFormatChange("TEXT FILE")}
                >
                  TEXT FILE
                </button>
                <button
                  type="button"
                  className={`RSA-btn ${
                    selectedFormat === "PDF FILE" ? "selected" : ""
                  }`}
                  onClick={() => handleFormatChange("PDF FILE")}
                >
                  PDF FILE
                </button>
              </div>
            </div>
            {/* download document section */}
            <div className="algorithmsection">
              <button
                type="submit"
                class="btn btn-primary"
                id="Encrypt-btn"
                onClick={handleEncryption}
              >
                ENCRYPT DOCUMENT
              </button>
              <button
                class="btn btn-secondary"
                onClick={clearTextArea}
                id="clear-btn"
              >
                CLEAR EXTRACTED TEXT
              </button>
              <button class="btn btn-secondary" id="Download-btn">
                <a href={`http://localhost:5000/${fileUrl}`} download>
                  DOWNLOAD DOCUMENT
                </a>
                <i class="bx bx-download"></i>
              </button>
            </div>
          </div>
        </div>
        {/* end of the bottom section design */}
      </div>
      {/* end of header section */}

      <Footer />
    </div>
  );
}
