import { RiContactsLine } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import s from "./Contact.module.css";

const Contact = ({ name, number, onDelete }) => {
  return (
    <motion.li
      className={s.contactItem}
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={s.contact}>
        <span className={s.name}>
          <RiContactsLine className={s.icon_name} size="18" />

          <TypeAnimation
            sequence={[name, 2000]}
            speed={50}
            wrapper="span"
            type="char"
          />
          {": "}
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
        onClick={onDelete}
      >
        Delete
      </Button>
    </motion.li>
  );
};

export default Contact;
