import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="Login-page login-signup-style">
      <div className="image-box">
        <img src="./signup-img.svg" alt="login" />
      </div>
      <h4>Become a geeker</h4>
      <div className="user-input-box">
      <div className="input-box">
        <input 
            type="text"
            placeholder="Username"
        />
      </div>

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
        <button>Sign Up</button>
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
    </div>
  )
}

export default Signup
