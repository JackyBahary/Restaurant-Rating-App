import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Layout.scss";

const Layout: FC = () => {
  return (
    <>
      <nav className="navbar">
        <NavLink className="navbar__logo" to="/">
          <img src="/restaurant.png" alt="LOGO" />
        </NavLink>
        <ul className="navbar__items">
          <li className="navbar__item">
            <NavLink className="navbar__link" to="/">
              Home
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink className="navbar__link" to="/add">
              Add
            </NavLink>
          </li>
        </ul>
        <div className="right">Logout</div>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
