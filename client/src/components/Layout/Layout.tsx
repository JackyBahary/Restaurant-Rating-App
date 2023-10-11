import { FC, useContext } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./Layout.scss";
import { AuthContext } from "../../contexts/AuthContext";

const Layout: FC = () => {
  // Create navigate function to go back to login page
  const navigate = useNavigate();

  // UseContext Hook, to get authentication functions from App.tsx
  const { email, setEmail, loggedIn, setLoggedIn, setPassword } =
    useContext(AuthContext);

  const handleLogout = () => {
    setEmail("");
    setPassword("");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <NavLink className="navbar__logo" to="/">
          <img src="/restaurant.png" alt="LOGO" />
        </NavLink>
        {!loggedIn && (
          <ul className="navbar__items">
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/">
                Login
              </NavLink>
            </li>
            <li className="navbar__item">
              <NavLink className="navbar__link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        )}
        {loggedIn && (
          <>
            <ul className="navbar__items">
              <li className="navbar__item">
                <NavLink className="navbar__link" to="/home">
                  Home
                </NavLink>
              </li>
              <li className="navbar__item">
                <NavLink className="navbar__link" to="/add">
                  Add
                </NavLink>
              </li>
            </ul>
            <div>Welcome {email}</div>
            <button className="right" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
