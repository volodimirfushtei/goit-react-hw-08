import s from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsSlice";
import { nanoid } from "nanoid"; // Importing nanoid for unique IDs
import { selectContacts } from "../../redux/Contacts/selectors";
// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^\+?[0-9\s()-]+$/, "Must be a valid phone number")
    .required("Number is required")
    .min(3, "Too Short!")
    .max(50, "Too Long!"),
});

const initialValues = {
  name: "",
  number: "",
};

const ContactForm = () => {
  const contacts = useSelector(selectContacts);
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

    dispatch(
      addContact({ id: nanoid(), name: values.name, number: values.number })
    );
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
          <button className={s.button} type="submit">
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
