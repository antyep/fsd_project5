import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, userData } from "../../pages/userSlice";
import logo from "../../img/logo.png";

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRdxData = useSelector(userData);

  const token = userRdxData.credentials.token;
  const decoded = userRdxData.credentials.userData;

  const logMeOut = () => {
    dispatch(logout({ credentials: {} }));
    navigate("/");
  };

  console.log("decoded", decoded);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-content">
        <div className="navbar-left">
          <div className="logo-container">
            <img src={logo} className="MainLogo" alt="Logo" />
          </div>
        </div>
        <div className="navbar-right">
          <Link to="/">Home</Link>
          <Link to="Artists">Artists</Link>
          <Link to="Contact">Contact</Link>
          {!token && (
            <>
              <Link to="/login">Sign In</Link>
              <Link to="register">Register</Link>
            </>
          )}
          {token && (
            <>
              <Link to="profile">Profile</Link>
              {decoded?.userRoles?.includes("admin") ? (
                <Link to="/admin">Admin</Link>
              ) : (
                <Link to="/appointment">My appointments</Link>
              )}
              <a className="link-item" onClick={() => logMeOut()}>
                Log Out
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
