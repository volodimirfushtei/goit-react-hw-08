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
    dispatch(logout()); // Викличте функцію logout
  };

  return (
    <div className={s.wrapper}>
      <h1 className={s.h1}>Phonebook</h1>
      <Avatar />
      <div className={s.nameuser}>{user.name}</div>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default UserMenu;
