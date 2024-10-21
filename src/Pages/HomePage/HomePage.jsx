// src/pages/HomePage.js
import s from "./HomePage.module.css";
const HomePage = () => {
  return (
    <div className={s.homepage_wrapp}>
      <h2 className={s.title}>Welcome to our application!</h2>
      <p className={s.p}>
        This application allows you to manage your contacts.
      </p>
      <p className={s.p}>Developer: Volodimir Fushtei</p>
    </div>
  );
};

export default HomePage;
