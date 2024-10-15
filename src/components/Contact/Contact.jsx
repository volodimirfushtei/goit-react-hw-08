import s from "./Contact.module.css";
import { RiContactsLine } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import Button from "@mui/material/Button";
import  DeleteIcon  from '@mui/icons-material';

const Contact = ({ name, number, onDelete }) => {
  return (
    <li className={s.contactItem}>
      <div className={s.contact}>
        <span className={s.name}>
          <RiContactsLine className={s.icon_name} size="18" />
          {name}:{" "}
        </span>
        <span className={s.number}>
          <BsTelephone className={s.icon_number} size="18" />
          {number}
        </span>
      </div>
      <Button
        
        variant="contained"
        color="secondary"
        className={s.contact_btn}
        onClick={onDelete}
      >
        Delete
      </Button>
    </li>
  );
};
export default Contact;
