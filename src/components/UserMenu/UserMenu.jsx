// src/components/UserMenu/UserMenu.jsx
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import s from "./UserMenu.module.css";
import { logout } from "../../redux/auth/operations.js";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/auth/selectors.js";

const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part[0].toUpperCase()).join("");
    return initials;
  };
  return (
    <div className={s.wrapper}>
      <Avatar
        src={`https://ui-avatars.com/api/?name=${getInitials(
          user.name
        )}&size=40&color=fff&background=7ed321`}
        alt={user.name}
        className={s.avatar}
      />
      <div className={s.nameuser}>{user.name}</div>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
