import React, { useState } from "react";
import logoimg from "./post office logo-black.png";
import "./loginform.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
import { useEffect } from "react";

export default function LoginForm() {
  // creating state variables to access the fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // new set loading state
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000); // Set loading time to 2000 milliseconds (2 seconds)

    return () => clearTimeout(timer);
  }, []);

  // handle the state changing events in email and password fields
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangepassword = (e) => {
    setPassword(e.target.value);
  };

  // handling the login of the user
  const handleSignin = async (e) => {
    e.preventDefault();

    //declaring the payload to send for the database
    const loginData = {
      email,
      password,
    };
    //use axios to send the data to the backend

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/signin",
        loginData
      );

      // if the user login successful
      if (response.status === 200) {
        // taking the data from the backend as response
        const { accessToken, user } = response.data;
        console.log(`login successful ` + user.userName);
        // console.log("primarykey: ", user.primaryKey);

        // then store the users access token in session storage to manage the session of the user
        sessionStorage.setItem("accessToken", accessToken);
        //store the primary key in the session storage
        sessionStorage.setItem("primaryKey", user.primaryKey);
        // console.log(accessToken);
        //store the username when logging into session storage
        sessionStorage.setItem("username", user.userName);
        //store the public key when logging in a session
        sessionStorage.setItem("publicKey", user.publicKey);
        //store the private key in session
        sessionStorage.setItem("privateKey", user.privateKey);

        //then user should navigate to the dashboard page
        navigate("/homepage");
      }
    } catch (error) {
      console.log(error.response.data);
      //set message to notify the user about the error
      setMessage(error.response.data);
    }
  };

  return (
    // conditionaly render the loading component

    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="logform">
          <header className="header-section">
            <div className="panel1">
              {/* <img src={logoimg} alt="" srcset="" /> */}
            </div>
          </header>
          <div className="wrapper">
            <div className="title">SIGNIN</div>

            {/* login form in the login interface */}
            <form>
              {/* email textfield */}
              <div className="field">
                <input
                  type="email"
                  name="email"
                  onChange={onChangeEmail}
                  required
                ></input>
                <label>Email Address</label>
              </div>
              {/* password textfield */}
              <div className="field">
                <input
                  type="password"
                  name="password"
                  onChange={onChangepassword}
                  required
                ></input>
                <label>Password</label>
              </div>
              <div className="content">
                <div className="checkbox">
                  <input type="checkbox" id="remember-me"></input>
                  <label for="remember-me">Remember me</label>
                </div>
                <div className="pass-link">
                  <a href="#">Forgot password?</a>
                </div>
              </div>
              <div className="field">
                <input
                  type="submit"
                  onClick={handleSignin}
                  value="Login"
                ></input>
              </div>

              {/* displaying error message when event triggered */}
              <div className="error-message" name="errorMessage">
                {message}
              </div>

              <div className="signup-link">
                Not a member?
                <Link to="/register">Signup Now</Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
