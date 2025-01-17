import React from "react";
import "./footer.css";
import { useNavigate } from "react-router-dom";
import Carosoul from "./Carosoul";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <div className="foot">
      <div className="footercontent">
        {/* Pagination list code */}
        <div className="listone">
          <ul>
            <li>
              <a onClick={() => navigate("/homepage")} href="#">
                DASHBOARD
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/encrypt")} href="#">
                ENCRYPTION
              </a>
            </li>
            <li>
              <a onClick={() => navigate("/decrypt")} href="#">
                DECRYPTION
              </a>
            </li>
            <li>
              <a href="#">MAIL TRACKER</a>
            </li>
            <li>
              <a href="#">SUPPORT</a>
            </li>
            <li>
              <a onClick={() => navigate("/profile")}>PROFILE</a>
            </li>
          </ul>
        </div>
        {/* SOCIAL MEDIA LIST CODE */}
        <div className="listone">
          <ul>
            <li>
              <a href="#">NEWS</a>
            </li>
            <li>
              <a href="#">CONTACT US</a>
            </li>
            <li>
              <a href="#">OTHER SERVICES</a>
            </li>
          </ul>
        </div>

        {/* Social media links */}
        <div className="listone">
          <ul>
            <li>
              <i class="bx bxl-facebook"></i>
            </li>
            <li>
              <i class="bx bxl-twitter"></i>
            </li>
            <li>
              <i class="bx bx-chat"></i>
            </li>
          </ul>
        </div>
        <div className="siteinfo">
          <p>
            Designed and develop by buddhima chathuranga <br />
            Copyright © 2024 | Department of Sri lankan post
          </p>
        </div>
      </div>
    </div>
  );
}
