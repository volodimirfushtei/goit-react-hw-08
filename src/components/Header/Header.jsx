import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import clsx from "clsx";
const Header = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };
  return (
    <div className={s.wrapper}>
      <div className={s.wrapperLinks}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <h1 className="s.h1">Phonebook</h1>

        <NavLink className={buildLinkClass} to="/about">
          Register
        </NavLink>
        <NavLink className={buildLinkClass} to="/users">
          Log in
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
