// import React, { useState } from "react";
import "../stylings/dashboard.css";
import SideBarMenuDashboard from "../components/sideBarMenuDashboard";
import bgimg from "../images/profile-test.png";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Headersection from "../components/Headersection";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");

  useEffect(() => {
    // Function to retrieve data from the backend
    const fetchData = async () => {
      try {
        // Get the user's token from session storage
        const token = sessionStorage.getItem("accessToken");
        console.log(token);
        //get the username from the session storage
        const username = sessionStorage.getItem("username");
        setUserName(username); // set the name

        // Make an authenticated request with the Bearer token
        const response = await axios.get("http://localhost:5000/auth/session", {
          headers: {
            Authorization: `Bearer ${token}`, // Correct format for Bearer token
          },
        });

        // setData(response.data); // Set the response data to state
        console.log(response.data);
      } catch (error) {
        //error handling part
        alert("Session expired, please log in again");
        sessionStorage.clear(); // once the session expired within given time it will clear the users session
        navigate("/", { replace: true }); // once session over it will redirect to login page and it cannot be revert back
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <main className="homepage">
      <SideBarMenuDashboard />

      {/* Hero Start */}
      <div className="dash">
        <div className="user">
          <h1 id="welcome">Welcome... </h1>
          <div class="mt-3 mb-4 profile-pic">
            <img src={bgimg} alt="" />
            <h1>{username}</h1>
          </div>
        </div>

        <Headersection />
        <section className="hero">
          <div className="row container">
            <div className="column">
              <h1>SECURE | MAIL | DELIVERY</h1>
              <p>
                Sri Lankan postal service expanding existing mail system to
                offer high demanding security features to protect sensitive
                information from intermediates by integrating robust web-based
                encryption and decryption technologies.
              </p>
              <div className="buttons">
                <button className="btn">Read More</button>
                <button className="btn">Contact Us</button>
              </div>
            </div>
          </div>
        </section>

        {/* this is the feature card section */}
        <div>
          <FeatureCard />
          {/* <Carosoul /> */}
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
