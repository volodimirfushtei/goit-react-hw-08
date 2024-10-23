import s from "./ContactForm.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addContacts } from "../../redux/contacts/operations.js";
// import { nanoid } from "nanoid"; // Importing nanoid for unique IDs
import { selectFilteredContacts } from "../../redux/contacts/selectors.js";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-hot-toast";
// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^\+?[0-9\s()-]+$/, "Must be a valid phone number")
    .required("Number is required")
    .min(5, "Too Short!")
    .max(50, "Too Long!"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  const handleAddContact = (values, { resetForm }) => {
    const existingContact = contacts.find(
      (contact) => contact.name === values.name
    );

    if (existingContact) {
      alert(`${values.name} is already in contacts!`);
      resetForm();
      return;
    }

    dispatch(addContacts({ name: values.name, number: values.number }));
    toast.success("Contact added successfully!");
    resetForm();
  };

  return (
    <div className={s.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleAddContact}
      >
        <Form className={s.form_container}>
          <div className={s.name_container}>
            <label className={s.label}>
              <span className={s.name}>Name</span>
              <Field
                className={s.input}
                type="text"
                name="name"
                placeholder="Your Name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className={s.errorMessage_name}
              />
            </label>
          </div>
          <div className={s.number_container}>
            <label className={s.label}>
              <span className={s.number}>Number</span>
              <Field
                className={s.input}
                type="text"
                name="number"
                placeholder="Your Number"
              />
              <ErrorMessage
                name="number"
                component="div"
                className={s.errorMessage_number}
              />
            </label>
          </div>
          <Button
            color="secondary"
            startIcon={<AddIcon />}
            variant="contained"
            className="s.button"
            type="submit"
            size="medium"
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
          >
            Add contact
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
