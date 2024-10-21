import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
// Додайте імпорт для кнопки
import s from "./AuthNav.module.css";
import clsx from "clsx";

function stringToColor(string) {
  if (!string) return "#000"; // Повертаємо чорний колір, якщо рядок порожній або null
  let hash = 0;
  for (let i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";
  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  if (!name) return {}; // Повертаємо пустий об'єкт, якщо ім'я відсутнє
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0] || ""}`,
  };
}

const AuthNav = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };

  return (
    <div className={s.name_wrapp}>
      <h1 className={s.h1}>Phonebook</h1>
      <Avatar {...stringAvatar(user.name)} />
      <div className={s.name_wrapp}>
        {isLoggedIn ? (
          <div className={s.nameuser}>{user.name}</div>
        ) : (
          <div className={s.login}>Try to log in</div>
        )}
      </div>
      <NavLink className={buildLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        Log in
      </NavLink>
    </div>
  );
};

export default AuthNav;
