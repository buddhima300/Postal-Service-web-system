import React from "react";
import "./card.css";

export default function FeatureCard() {
  return (
    <div className="panel1">
      <h1 id="features">FEATURES</h1>
      <div className="cardline">
        <div className="cardbg">
          <div className="cardheader">
            <img
              src="https://cdn-icons-png.flaticon.com/512/8393/8393436.png"
              alt=""
            />
            <h2>ENCRYPTION </h2>
            <p>
              Encrypt your letters and documents using cutting-edge algorithms
              to protect your sensitive information during postal transmission.
              Ensure your data remains secure from start to finish.
            </p>
          </div>
          <div className="cardbottom">
            <p>charges are applicable</p>
            <label>Encrypt Documents</label>
            <br />
            <label>Encrypt Mails</label>
            <br />
            <label>support different algorithms</label>
            <h2>25LKR/ PER ONE</h2>
          </div>
        </div>
        <div className="cardbg">
          <div className="cardheader">
            <img
              src="https://cdn4.iconfinder.com/data/icons/common-app-symbols-round-colored/1024/unlock_discover_decrypt_uncover_app_round_colored-512.png"
              alt=""
            />
            <h2>DECRYPTION </h2>
            <p>
              Effortlessly decrypt your encrypted documents or letters using
              your unique user key. Our decryption feature ensures that your
              sensitive information remains accessible only to you, preserving
              security and confidentiality.
            </p>
          </div>
          <div className="cardbottom">
            <p>charges are applicable</p>
            <label>Decrypt Documents</label>
            <br />
            <label>Decrypt Mails</label>
            <br />
            <label> Decrypt with respective key</label>
            <h2>25LKR/ PER ONE</h2>
          </div>
        </div>
        <div className="cardbg">
          <div className="cardheader">
            <img
              src="https://cdn-icons-png.flaticon.com/512/10646/10646456.png"
              alt=""
            />
            <h2>HYBRID MAILS </h2>
            <p>
              Hybrid mail feature offers User to encrypt the document or letter
              and send through online to relevant sub post office to print and
              share
            </p>
          </div>
          <div className="cardbottom">
            <p>
              Future development
              <span className="badge text-bg-warning">New</span>
            </p>
            <label>Encrypt Mails</label>
            <br />
            <label>Send via internet</label>
            <h2>50LKR/ PER ONE</h2>
          </div>
        </div>
        <div className="cardbg">
          <div className="cardheader">
            <img
              src="https://cdn1.iconfinder.com/data/icons/zikons/400/--15-512.png"
              alt=""
            />
            <h2>MAIL TRACKER </h2>
            <p>
              The Mail Tracker Feature enables users to monitor the progress of
              their postal items using a unique tracking number, real-time
              updates via a digital map interface, allowing users to confirm
              whether the mail has been dispatched and delivered.
            </p>
          </div>
          <div className="cardbottom">
            <p>
              Future development
              <span className="badge text-bg-warning">New</span>
            </p>
            <label>Track your Documents</label>
            <br />
            <label>Track your Mails</label>
            <br />
            <label>Track with unique tracking number</label>
            <h2>FREE</h2>
          </div>
        </div>
        <div className="cardbg">
          <div className="cardheader">
            <img
              src="https://cdn-icons-png.flaticon.com/512/11391/11391385.png"
              alt=""
            />
            <h2>TAMPERING DETECTION</h2>
            <p>
              Safeguard your mail documents with our Tampering Detection AI
              tool. This cutting-edge technology monitors your documents
              throughout the transmission process, detecting and reporting any
              unauthorized changes instantly.
            </p>
          </div>
          <div className="cardbottom">
            <p>
              Future development
              <span className="badge text-bg-warning">New</span>
            </p>
            <label>Scan your Documents</label>
            <br />
            <label>Scan your Mails</label>
            <br />
            <label>Scan your parcels</label>
            <h2>FREE</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
