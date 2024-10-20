import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./RegistrationForm.module.css"; // Імпорт модульних стилів
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations.js";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, options) => {
    console.log("Form values:", values);
    dispatch(register(values));
    options.resetForm();
  };

  return (
    <div className={styles.hero}>
      <div className={styles.hero}>
        <div className={styles.textCenter}>
          <h2 className={styles.title}>Registration</h2>
          <p className={styles.description}>Create your account</p>
        </div>
        <div className={styles.card}>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className={styles.cardBody}>
                <div className={styles.formControl}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>Name</span>
                  </label>
                  <Field
                    as={TextField}
                    name="name"
                    placeholder="Name"
                    className={styles.input}
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
                <div className={styles.formControl}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>Email</span>
                  </label>
                  <Field
                    as={TextField}
                    name="email"
                    placeholder="Email"
                    className={styles.input}
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
                <div className={styles.formControl}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>Password</span>
                  </label>
                  <Field
                    as={TextField}
                    name="password"
                    placeholder="Password"
                    type="password"
                    className={styles.input}
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className={styles.errorMessage}
                  />
                </div>
                <div className={styles.formControl}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Register
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
