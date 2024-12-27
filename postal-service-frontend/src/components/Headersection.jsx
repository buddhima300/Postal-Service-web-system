import React from "react";
import "./headersection.css";
import sideimg from "../images/sideimg.png";
import sideimg2 from "../images/Encryption.png";

function Headersection() {
  return (
    <div>
      <div className="header col-md-12">
        <div className="left col-md-6 typewriter">
          <h5>Secure Postal Communication Like Never Before</h5>
          <h1>
            <span>Safeguarding</span> Your Formal communications with encryption
            and decryption tools.
          </h1>
          <p>
            Our platform is designed to revolutionize the way you handle
            sensitive postal communications by offering a seamless, secure, and
            smart solution for your document management needs. With a focus on
            simplicity and efficiency, we provide an intuitive interface that
            allows you to easily upload your documents, encrypt them for
            ultimate confidentiality, and decrypt them when needed.
          </p>
          {/* <button id="btn">Let's get start</button> */}
        </div>
        {/* right section code lines */}
        <div className="right col-md-6">
          <img src={sideimg} alt="" srcset="" />
        </div>
      </div>
      {/* second section */}
      <div className="header col-md-12">
        {/* right section code lines */}
        <div className="right col-md-6">
          <img src={sideimg2} alt="" srcset="" />
        </div>
        <div className="left col-md-6 ">
          <h5>
            cutting edge cryptographic algorithms and modern web technologies
          </h5>
          <h1>
            <span>web-based platform</span>
            <br />
            designed to transform the way sensitive documents are managed.
          </h1>
          <p>
            This innovative system streamlines the process of document
            encryption, decryption, and tracking, providing a user-friendly
            experience for both individuals and organizations. Whether it’s
            safeguarding business-critical files or tracking important packages,
            the application offers a seamless and reliable solution tailored to
            modern postal challenges.
          </p>
          <button id="btn">Let's get start</button>
        </div>
      </div>
      {/* third section */}
      <div className="header col-md-12">
        {/* right section code lines */}
        <div className="left col-md-6 ">
          <h5>Token-based authentication and role-based access control</h5>
          <h1>
            <span>Enhanced Security</span>
            <br />
            through advanced measures.
          </h1>
          <p>
            It employs robust cryptographic algorithms such as AES and RSA to
            ensure that only authorized individuals can access encrypted
            content, providing an unparalleled layer of protection against
            unauthorized access. Token-based authentication and role-based
            access control (RBAC) further enhance security by ensuring that
            sensitive operations, like file decryption, are restricted to
            verified users with appropriate permissions. Additionally, the
            application adheres to global data protection standards, such as
            GDPR, ensuring that user data is handled with the highest levels of
            security and compliance.
          </p>
          <button id="btn">Let's get start</button>
        </div>
        <div className="right col-md-6">
          <img src={sideimg2} alt="" srcset="" />
        </div>
      </div>
    </div>
  );
}

export default Headersection;
