import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from '../hooks/useLogin';
import { PiWarningFill } from "react-icons/pi";

const Login = () => {
    const navigate = useNavigate();

    // state for login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      await login(email, password);
    };

  return (
    <form className="Login-page login-signup-style" onSubmit={handleSubmit}>
      <div className="image-box">
        <img src="./login-img.svg" alt="login" />
      </div>
      <h4>Welcome Back</h4>
      <div className="user-input-box">
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
        <button disabled={isLoading}>Login</button>
      </div>
      <div className="link-to-otherway">
        <div className="otherway-contents">
            <p>Don't have an account?</p>
            <span
                onClick={() => navigate('/signup')}
            >
                Sign up here
            </span>
        </div>
      </div>
      <div className="error-message">
        {error && <div className="error"><PiWarningFill />{error}</div>}
      </div>
    </form>
  )
}

export default Login
