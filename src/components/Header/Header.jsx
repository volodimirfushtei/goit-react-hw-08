import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import clsx from "clsx";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../redux/auth/selectors";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/auth/operations.js";
function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}
function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Header = () => {
  const dispatch = useDispatch();
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.activeLink);
  };
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    console.log("Logout button clicked");
    if (isLoggedIn && token) {
      console.log("Dispatching logout");
      dispatch(logout());
    } else {
      console.error("No valid token found for logout.");
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.wrapperLinks}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <div className={s.name_wrapp}>
          {user ? (
            <div className={s.nameuser}>{user.name}</div>
          ) : (
            <div className={s.login}>Please log in</div>
          )}
          <Avatar {...stringAvatar("Volodimir Fushtei")} />
        </div>
        <h1 className="s.h1">Phonebook</h1>
        {!isLoggedIn && (
          <>
            <NavLink className={buildLinkClass} to="/register">
              Register
            </NavLink>
            <NavLink className={buildLinkClass} to="/login">
              Log in
            </NavLink>
          </>
        )}
        {isLoggedIn && (
          <Button
            type="submit"
            variant="contained"
            size="small"
            color="secondary"
            href="#text-buttons"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
