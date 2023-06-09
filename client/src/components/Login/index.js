import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import Logo from '../../assets/test-sypherlink-logo.svg'; //Logo
import Auth from "../../utils/auth.js";
import JoinRoom from "../JoinRoom.js";
import SideBar from "../SideBar.js";

const Login = () => {
  const navigate = useNavigate(); // Create a navigate function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  console.log(Auth.loggedIn());

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("")
    if (email === "") {
      setErrorMessage("Please enter email")
      return;
    }
    if (password === "") {
      setErrorMessage("Please enter password")
      return;
    }

    var re = /\S+@\S+\.\S+/;
    if (re.test(email) === false) {
      setErrorMessage("Invalid email");
      return;
    }

    try {
      const { data } = await loginUser({
        variables: {
          email: email,
          password: password,
        },
      });

      const userId = data.login.user._id;
      const username = data.login.user.username;
      console.log(userId, username);

      Auth.login(data.login.token);

      // Redirect to the home page
      navigate("/"); // Replace "/" with the desired home page URL
    } catch (error) {
      console.log(error);
      setErrorMessage("Invalid credentials");
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return Auth.loggedIn() ? (
    <JoinRoom />
  ) : (
    <div className="h-screen bg-slate-900 flex justify-center items-center">
      <section className="mb-auto flex flex-col w-full mx-auto">
        <div className="flex flex-col justify-center items-center space-y-10">
          <div className=" w-[400px] h-[400px] flex justify-center">
            <img src={Logo} className="w-[600px] h-[600px]" />
          </div>
          <div className="flex justify-center mt-0">
            <h3 className="text-2xl text-white">Welcome Back!</h3>
          </div>
          <div className="md:w-1/3 max-w-sm">
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="text-center md:text-left mt-8">
              <button
                className=" w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
                onClick={handleLogin}
              >
                {loading ? "Logging in..." : "LOGIN"}
              </button>
            </div>
            {errorMessage && (
              <div className="text-center md:text-left mt-4 text-yellow-500">
                {errorMessage}
              </div>
            )}
            <div className="text-center md:text-left mt-4">
              <button
                className=" w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
                onClick={handleSignupClick}
              >
                SIGNUP
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
import React from "react";
