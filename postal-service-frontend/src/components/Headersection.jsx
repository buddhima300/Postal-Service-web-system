import React from "react";
import "./headersection.css";
import sideimg from "../images/sidebg.png";

function Headersection() {
  return (
    <div className="header col-md-12">
      <div className="left col-md-6 typewriter">
        <h5>Secure Postal Communication Like Never Before</h5>
        <h1>
          <span>Safeguarding</span> Your Formal communications with encryption
          and decryption tools.
        </h1>
        <p>
          Our platform is designed to revolutionize the way you handle sensitive
          postal communications by offering a seamless, secure, and smart
          solution for your document management needs. With a focus on
          simplicity and efficiency, we provide an intuitive interface that
          allows you to easily upload your documents, encrypt them for ultimate
          confidentiality, and decrypt them when needed.
        </p>
        <button id="btn">Let's get start</button>
      </div>
      {/* right section code lines */}
      <div className="right col-md-6">
        <img src={sideimg} alt="" srcset="" />
      </div>
    </div>
  );
}

export default Headersection;
