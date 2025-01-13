import { TypeAnimation } from "react-type-animation";
import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.homepage_wrapp}>
      <h2 className={s.title}>
        <TypeAnimation
          sequence={[
            "Welcome to our application!",
            2000,
            "Manage your contacts easily",
            2000,
            "Let's get started!",
            2000,
          ]}
          speed={50}
          repeat={Infinity}
        />
      </h2>
      <p className={s.p}>
        This application allows you to manage your contacts.
      </p>
      <p className={s.p}>
        <TypeAnimation
          sequence={[
            "Add new contacts",
            2000,
            "Edit contacts",
            2000,
            "Delete contacts",
            2000,
          ]}
          speed={50}
          repeat={Infinity}
        />
        Developer: Volodimir Fushtei
      </p>
    </div>
  );
};

export default HomePage;
