import { Outlet } from "react-router-dom";
import Header from "../UserMenu/UserMenu";
const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
