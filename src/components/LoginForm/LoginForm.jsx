import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { motion } from "framer-motion"; // Import framer-motion
import s from "./LoginForm.module.css";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations.js";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const handleSubmit = (values, options) => {
    console.log("Form values:", values);
    dispatch(login(values));
    options.resetForm();
  };

  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <div className={s.hero}>
      <motion.div
        className={s.hero} // Apply animation to this outer div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className={s.text}>
          <h2 className={s.login}>Login now!</h2>
          <p className={s.p}>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <motion.div
          className={s.card}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }} // Delay for smooth reveal
        >
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className={s.card_cont}>
                {/* Email field animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className={s.form}>
                    <label className={s.label}>
                      <span className={s.label_text}>Email</span>
                    </label>
                    <Field
                      as={TextField}
                      name="email"
                      placeholder="email"
                      className={s.input}
                      variant="outlined"
                      fullWidth
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className={s.error_message}
                    />
                  </div>
                </motion.div>
                {/* Password field animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <div className={s.form_control}>
                    <label className={s.label}>
                      <span className={s.label_text}>Password</span>
                    </label>
                    <Field
                      as={TextField}
                      name="password"
                      placeholder="password"
                      type="password"
                      className={s.input}
                      variant="outlined"
                      fullWidth
                      required
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className={s.error_message}
                    />
                    <label className={s.label}>
                      <a href="#" className={s.label_text}>
                        Forgot password?
                      </a>
                    </label>
                  </div>
                </motion.div>
                {/* Submit Button animation */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  // Button hover effect
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className={s.form_control}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      fullWidth
                    >
                      Login
                    </Button>
                  </div>
                </motion.div>
              </Form>
            )}
          </Formik>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
