import React, { useState } from "react";
import SideBarMenuDashboard from "../components/sideBarMenuDashboard";
import "../stylings/profile.css";
import sideImg from "../images/test2.jpg";
import ActivityCard from "../components/ActivityCard";

function Profile() {
  const [profilePicture, setProfilePicture] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div class="layout">
      {/* left side of the page */}
      <SideBarMenuDashboard />
      <div class="left-panel">
        <img src={sideImg} alt="" srcset="" />
      </div>

      {/* right side of the page */}
      <div class="right-panel">
        <div className="panel">
          <div className="panel-item">
            <h1>ACCOUNT DETAILS</h1>
            <p>Real time information and account activities</p>
            <hr />
            {/* profile picture upload */}
            <div class="col-md-6">
              <label for="inputProfilePicture" class="form-label">
                Profile Picture
              </label>
              <div class="profile-picture-upload">
                <input
                  type="file"
                  id="inputProfilePicture"
                  onChange={handleFileChange}
                />
                <div class="profile-picture-preview">
                  <img src={profilePicture} alt="" />
                </div>
              </div>
            </div>

            {/* form submissions */}
            <hr />
            <form class="row g-3">
              <div class="col-md-6">
                <label for="inputFirstname" class="form-label">
                  Firstname
                </label>
                <input type="text" class="form-control" id="inputfirstname" />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">
                  Lastname
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="inputlastname"
                />
              </div>
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">
                  Email
                </label>
                <input type="email" class="form-control" id="inputEmail4" />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="inputPassword4"
                />
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">
                  Username
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  placeholder="1234 Main St"
                />
              </div>
              <div class="col-12">
                <label for="inputAddress2" class="form-label">
                  Address
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress2"
                  placeholder="Apartment, studio, or floor"
                />
              </div>
              <div class="col-md-6">
                <label for="inputCity" class="form-label">
                  City
                </label>
                <input type="text" class="form-control" id="inputCity" />
              </div>
              <div class="col-md-4">
                <label for="inputState" class="form-label">
                  State
                </label>
                <select id="inputState" class="form-select">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="inputZip" class="form-label">
                  Zip
                </label>
                <input type="text" class="form-control" id="inputZip" />
              </div>
              <div class="col-12">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    Check me out
                  </label>
                </div>
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* recent activity section */}
        <ActivityCard />
      </div>
    </div>
  );
}

export default Profile;
