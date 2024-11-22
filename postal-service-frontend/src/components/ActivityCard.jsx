import React from "react";
import "../components/activity.css";
import profileimg from "../images/test.png";

export default function activityCard() {
  return (
    <div>
      <div className="headsection">
        <h3>RECENT ACTIVITIES</h3>
        <p>Most frequently encrypted Documents</p>
      </div>
      <hr />
      {/* card section  */}
      <div className="activitycard">
        <div className="cardimg">
          <img src={profileimg} alt="reciever-profile-pic" />
        </div>
        <div className="carddetails">
          <h4>John Doe</h4>
          <p>Reciever public key</p>
          <p>2024.11.05</p>
          <p>10.20 PM</p>
        </div>
      </div>

      <div className="activitycard">
        <div className="cardimg">
          <img src={profileimg} alt="reciever-profile-pic" />
        </div>
        <div className="carddetails">
          <h4>John Doe</h4>
          <p>Reciever public key</p>
          <p>2024.11.05</p>
          <p>10.20 PM</p>
        </div>
      </div>

      <div className="activitycard">
        <div className="cardimg">
          <img src={profileimg} alt="reciever-profile-pic" />
        </div>
        <div className="carddetails">
          <h4>John Doe</h4>
          <p>Reciever public key</p>
          <p>2024.11.05</p>
          <p>10.20 PM</p>
        </div>
      </div>

      <div className="activitycard">
        <div className="cardimg">
          <img src={profileimg} alt="reciever-profile-pic" />
        </div>
        <div className="carddetails">
          <h4>John Doe</h4>
          <p>Reciever public key</p>
          <p>2024.11.05</p>
          <p>10.20 PM</p>
        </div>
      </div>
    </div>
  );
}
