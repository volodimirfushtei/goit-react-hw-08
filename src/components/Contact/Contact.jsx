import { RiContactsLine } from "react-icons/ri";
import { BsTelephone } from "react-icons/bs";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion"; // Імпортуємо motion для анімації
import s from "./Contact.module.css"; // Переконайтеся, що імпортуєте правильний CSS

const Contact = ({ name, number, onDelete }) => {
  return (
    <motion.li
      className={s.contactItem}
      initial={{ x: -100 }} // Початкова позиція (ліво)
      animate={{ x: 0 }} // Фінішна позиція (центральна)
      transition={{ duration: 0.5 }} // Тривалість анімації
    >
      <div className={s.contact}>
        <span className={s.name}>
          {/* Іконка контакту */}
          <RiContactsLine className={s.icon_name} size="18" />
          {/* Анімація імені контакту */}
          <TypeAnimation
            sequence={[name, 2000]} // Анімація імені контакту
            speed={50} // Швидкість набору символів
            wrapper="span" // Обгортка для анімації
            type="char" // Тип анімаці��
          />
          {": "}
        </span>

        {/* Номер телефону */}
        <span className={s.number}>
          <BsTelephone className={s.icon_number} size="18" />
          {number}
        </span>
      </div>

      {/* Кнопка для видалення */}
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
