import React, { useEffect } from "react";
import "./sidebar.css";
import logoimg from "./post office logo.png";
import { useNavigate } from "react-router-dom";

export default function SideBarMenuDashboard() {
  useEffect(() => {
    const body = document.querySelector("body");
    const sidebar = body.querySelector("nav");
    const toggle = body.querySelector(".toggle");

    const handleToggleClick = () => {
      sidebar.classList.toggle("close");
    };

    const handleSearchClick = () => {
      sidebar.classList.remove("close");
    };
    // toggle.addEventListener("click", handleToggleClick);

    return () => {
      // toggle.removeEventListener("click", handleToggleClick);
    };
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <nav className="sidebar close">
        {/* menu bar header */}
        <header>
          <div className="image-text">
            <span className="image">
              <img src={logoimg} alt="logo" />
            </span>
            <div className="text logo-text">
              <span className="name">POST OFFICE</span>
              <span className="profession">SRI LANKA</span>
            </div>
          </div>
          {/* <i className="bx bx-chevron-right toggle"></i> */}
        </header>

        {/* menu bar list */}
        <div className="menu-bar">
          <div className="menu">
            <ul className="menu-links">
              <li className="nav-link">
                <a onClick={() => navigate("/homepage")}>
                  <i className="bx bx-home-alt icon"></i>
                  <span className="text nav-text">DASHBOARD</span>
                </a>
              </li>
              <li className="nav-link">
                <a onClick={() => navigate("/encrypt")}>
                  <i className="bx bx-lock icon"></i>
                  <span className="text nav-text">ENCRYPTION</span>
                </a>
              </li>
              <li className="nav-link">
                <a onClick={() => navigate("/decrypt")}>
                  <i className="bx bx-lock-open icon"></i>
                  <span className="text nav-text">DECRYPTION</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-current-location icon"></i>
                  <span className="text nav-text">LOCATION TRACKER</span>
                </a>
              </li>
              <li className="nav-link">
                <a href="#">
                  <i className="bx bx-chat icon"></i>
                  <span className="text nav-text">SUPPORT</span>
                </a>
              </li>
              <li className="nav-link">
                <a onClick={() => navigate("/profile")}>
                  <i className="bx bxs-user-account icon"></i>
                  <span className="text nav-text">PROFILE</span>
                </a>
              </li>
            </ul>
          </div>

          {/* menu bar bottom content */}
          <div className="bottom-content">
            <li>
              <a onClick={() => navigate("/")}>
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
}
