// src/components/Navigation/Navigation.jsx

// src/components/UserMenu/Navigate.jsx
import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import clsx from "clsx";
import { useSelector } from "react-redux";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  return (
    <div className={s.wrapperLinks}>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={buildLinkClass} to="/contacts">
          Contacts
        </NavLink>
      )}
    </div>
  );
};

export default Navigation;
