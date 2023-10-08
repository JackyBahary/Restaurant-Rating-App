import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./styles/Layout.scss";

const Layout: FC = () => {
  return (
    <>
      <nav className="navbar">
        <a className="navbar__logo" href="/">
          <img src="/restaurant.png" alt="LOGO" />
        </a>
        <ul className="navbar__items">
          <li className="navbar__item">
            <a className="navbar__link" href="/">
              Home
            </a>
          </li>
          <li className="navbar__item">
            <a className="navbar__link">Add</a>
          </li>
          <li className="navbar__item">
            <a className="navbar__link">Update</a>
          </li>
          <li className="navbar__item">
            <a className="navbar__link">Delete</a>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Layout;
