import React from "react";
import "../components/process.css";
import stepimg from "../images/flow 1.png";

function Process() {
  return (
    <div>
      <h2>-- How It Works --</h2>
      <div className="cards">
        {/* step 1 */}
        <div className="step1">
          <div className="stepText">
            <img src={stepimg} alt="" />
          </div>
          <b>STEP 1:</b>
          <p>
            Upload the PNG/JPG File for Text extraction or use the editable text
            area to write your message
          </p>
        </div>
        {/* step 2 */}
        <div className="step1">
          <div className="stepText">
            <img src={stepimg} alt="" />
          </div>
          <b>STEP 2:</b>
          <p>Click the Text extraction button after file uploaded</p>
        </div>
        {/* step 3 */}
        <div className="step1">
          <div className="stepText">
            <img src={stepimg} alt="" />
          </div>
          <b>STEP 3:</b>
          <p>Enter the Reciever Public Key for Encryption</p>
        </div>
        {/* step 4 */}
        <div className="step1">
          <div className="stepText">
            <img src={stepimg} alt="" />
          </div>
          <b>STEP 4:</b>
          <p>Choose the Required Encryption/Decryption Algorithm</p>
        </div>
        {/* step 5 */}
        <div className="step1">
          <div className="stepText">
            <img src={stepimg} alt="" />
          </div>
          <b>STEP 5:</b>
          <p>
            Encrypt/Decrypt the Document and Download the Encrypted/Decrypted
            File
          </p>
        </div>
      </div>
    </div>
  );
}

export default Process;
