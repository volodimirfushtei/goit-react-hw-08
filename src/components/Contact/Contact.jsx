import s from "./Contact.module.css";
import { RiContactsLine } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";

import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

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
        color="secondary"
        variant="outlined"
        size="small"
        sx={{
          marginRight: 1,

          "&:hover": {
            bgcolor: "secondary.light",
            color: "secondary.contrastText",

            "&:focus": {
              outline: "none",
              "&:active": {
                transform: "scale(0.95)",

                "&:active:focus": {
                  outline: "none",
                },
              },
            },
          },
        }}
        startIcon={<DeleteIcon />}
        className="mr - 1"
        onClick={onDelete}
      >
        Delete
      </Button>
    </li>
  );
};
export default Contact;
