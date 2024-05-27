import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useAuthContext();
  const { logout } = useLogout();
  
  const hideButtons = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <header>
      <div className="logo">
        <h3 onClick={() => navigate('/')}>OTTGEEKS</h3>
      </div>

      {!hideButtons && (
        <div className="buttons">
          {user ? (
            <div className="user-info">
              <span className="username">Welcome, {user.user.username}</span>
              <button 
                className="logout-btn"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
      
    </header>
  )
}

export default Header
