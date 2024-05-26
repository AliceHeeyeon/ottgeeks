import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const hideButtons = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="header">
      <div className="logo">
        <h3 onClick={() => navigate('/')}>OTTGEEKS</h3>
      </div>

      {!hideButtons && (
        <div className="buttons">
          <button 
            className="signup-btn"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
          <button 
            className="login-btn"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      )}
      
    </div>
  )
}

export default Header
