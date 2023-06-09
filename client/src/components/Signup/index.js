import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import Auth from "../../utils/auth.js";

const Signup = () => {
  const navigate = useNavigate(); // Create a navigate function
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")
  const [addUser, { loading }] = useMutation(ADD_USER);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("")
    if(username === ""){
      setErrorMessage("Please enter username")
      return;
    }
    if(email === ""){
      setErrorMessage("Please enter email")
      return;
    }
    if(password === ""){
      setErrorMessage("Please enter password")
      return;
    }

    var re = /\S+@\S+\.\S+/;
    if(re.test(email)  === false){
      setErrorMessage("Invalid email");
      return;
    }



    
    try {
      const { data } = await addUser({
        variables: {
          username: username,
          email: email,
          password: password,
        },
      });
      Auth.login(data.addUser.token);

      // Redirect to the home page
      navigate("/"); // Replace "/" with the desired home page URL

    } catch (error) {
      console.log(error)
      if(error){
      setErrorMessage("Invalid credentials")
      return;
      }
    }
  };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
      <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="User Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
            onClick={handleSignup}
          >
            {loading ? "Signing in..." : "Submit"}
          </button>
        </div>
        <div>{errorMessage}</div>
      </div>
    </section>
  );
};

export default Signup;