import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import { NavLink } from "react-router-dom";

// Додайте імпорт для кнопки
import s from "./AuthNav.module.css";
import clsx from "clsx";

const AuthNav = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  return (
    <div className={s.name_wrapp}>
      <div className={s.name_wrapp}>
        {isLoggedIn ? (
          <div className={s.nameuser}>{user.name}</div>
        ) : (
          <div className={s.login}>Log in</div>
        )}
      </div>
      <NavLink className={buildLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        Login
      </NavLink>
    </div>
  );
};

export default AuthNav;
