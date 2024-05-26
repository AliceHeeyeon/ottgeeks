import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  return (
    <div className="Login-page login-signup-style">
      <div className="image-box">
        <img src="./login-img.svg" alt="login" />
      </div>
      <h4>Welcome Back</h4>
      <div className="user-input-box">
        <div className="input-box">
            <input 
                type="email"
                placeholder="Email"
            />
        </div>
        <div className="input-box">
            <input 
                type="text"
                placeholder="Password"
            />
        </div>
      </div>
      <div className="login-btn-box">
        <button>Login</button>
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
    </div>
  )
}

export default Login
