import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./RegistrationForm.module.css"; // Імпорт модульних стилів

// Валідаційна схема
const validationSchema = Yup.object({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const RegistrationForm = () => {
  const handleSubmit = (values) => {
    // Логіка для обробки реєстрації
    console.log("Form values:", values);
    // Тут можна додати логіку для реєстрації користувача
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
            initialValues={{ username: "", email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className={styles.cardBody}>
                <div className={styles.formControl}>
                  <label className={styles.label}>
                    <span className={styles.labelText}>Username</span>
                  </label>
                  <Field
                    as={TextField}
                    name="username"
                    placeholder="Username"
                    className={styles.input}
                    variant="outlined"
                    fullWidth
                    required
                  />
                  <ErrorMessage
                    name="username"
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
