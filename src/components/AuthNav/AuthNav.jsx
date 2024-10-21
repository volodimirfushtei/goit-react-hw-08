import { useSelector, useDispatch } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors.js";
import { logout } from "../../redux/auth/operations.js";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import s from "./AuthNav.module.css";

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
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    if (isLoggedIn && token) {
      dispatch(logout());
    }
  };

  return (
    <div className={s.name_wrapp}>
      {user ? (
        <>
          <Avatar {...stringAvatar(user.name)} />
          <div className={s.nameuser}>{user.name}</div>

          <Button
            type="button"
            variant="contained"
            size="small"
            color="secondary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <div className={s.login}>Please log in</div>
      )}
    </div>
  );
};

export default AuthNav;
