import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

import Auth from "../../utils/auth.js";
import ChatRoom from "../ChatRoom.js";

const Login = () => {
  const navigate = useNavigate(); // Create a navigate function
  
  const [email, setEmail] = useState("");  
  const [password, setPassword] = useState("");
  const [showChat, setShowChat] = useState(false);
  

  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  console.log(Auth.loggedIn());


  const handleLogin = async (e) => {
    e.preventDefault();

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
    }
  };

  return (
    Auth.loggedIn() ? (
      <ChatRoom />
    ):(
      <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
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

        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </section>
    )
  );
};

export default Login;
