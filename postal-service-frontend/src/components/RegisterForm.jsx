import React from "react";
import "./loginform.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const navigate = useNavigate();

  //handle the state changes in the form
  const onChangeName = (e) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangepassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  //on submit handle the data
  const handleSignup = async (e) => {
    e.preventDefault();

    //check whether these fields are empty or not
    if (!username) {
      setErrorMessage("Please Enter username");
      return;
    }
    if (!email) {
      setErrorMessage("Please Enter email");
      return;
    }
    if (!password) {
      setErrorMessage("Please Enter password");
      return;
    }
    if (!confirmPassword) {
      setErrorMessage("Please Re-Enter Your password to confirm");
      return;
    }

    //check whether users enterd passwords are equal
    if (confirmPassword !== password) {
      setErrorMessage("passwords does not match");
      return;
    }

    //declaring the payload to send for the database
    const registerData = {
      username,
      email,
      password,
      confirmPassword,
    };
    //use axios to send the data to the backend
    axios
      .post("http://localhost:5001/auth/signup", registerData)
      .then((res) => {
        console.log(res);
        setSuccessMessage("Registration Successful");
        //nredirecting to the signin page once the user registerd
        // navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="regform">
        <header>
          <div className="panel1">
            {/* <img src={logoimg} alt="" srcset="" /> */}
          </div>
        </header>
        <div class="wrapper">
          <div class="title">SIGNUP</div>
          <form>
            <div class="field">
              <input
                type="text"
                name="username"
                onChange={onChangeName}
                required
              ></input>
              <label>UserName</label>
            </div>
            <div class="field">
              <input
                type="email"
                name="email"
                onChange={onChangeEmail}
                required
              ></input>
              <label>Email Address</label>
            </div>
            <div class="field">
              <input
                type="password"
                name="password"
                onChange={onChangepassword}
                required
              ></input>
              <label>Password</label>
            </div>
            <div class="field">
              <input
                type="password"
                name="confirmPassword"
                onChange={onChangeConfirmPassword}
                required
              ></input>
              <label>Confirm-Password</label>
            </div>
            <div class="field">
              <input
                type="submit"
                onClick={handleSignup}
                value="Register"
              ></input>
            </div>
            {/* displaying error message when event triggered */}
            <div class="error-message" name="errorMessage">
              {errorMessage}
            </div>
            {/* displaying success message when event triggered */}
            <div class="success-message" name="successMessage">
              {successMessage}
            </div>

            <div class="signup-link">
              Already a member?
              <Link to="/">Signin Now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
