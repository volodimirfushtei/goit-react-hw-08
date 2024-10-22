// src/components/UserMenu/UserMenu.jsx
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import s from "./UserMenu.module.css";
import { logout } from "../../redux/auth/operations.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";
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
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout()); // Викличте функцію logout
  };

  return (
    <div className={s.wrapper}>
      <h1 className={s.h1}>Phonebook</h1>
      <Avatar {...stringAvatar(user.name)} />
      <div className={s.nameuser}>{user.name}</div>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
