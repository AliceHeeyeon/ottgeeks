import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";
import { PiWarningFill } from "react-icons/pi";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
  };

  return (
    <form className="Login-page login-signup-style" onSubmit={handleSubmit}>
      <div className="image-box">
        <img src="./signup-img.svg" alt="login" />
      </div>
      <h4>Become a geeker</h4>
      <div className="user-input-box">
      <div className="input-box">
        <input 
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
        />
      </div>

      <div className="input-box">
        <input 
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
        />
      </div>

      <div className="input-box">
        <input 
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
        />
      </div>
    
      </div>
      <div className="login-btn-box">
        <button disabled={isLoading}>Sign Up</button>
      </div>
      <div className="link-to-otherway">
        <div className="otherway-contents">
          <p>Already have an account?</p>
          <span
              onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </div>
      </div>
      <div className="error-message">
        {error && <div className="error"><PiWarningFill />{error}</div>}
      </div>
    </form>
  )
}

export default Signup
