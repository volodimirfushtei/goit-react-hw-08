import "./App.css";
import { Routes, Route } from "react-router-dom";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Layout from "./components/Layout/Layout";
import { fetchContacts } from "./redux/contacts/operations.js";
import Home from "./Pages/Home/Home";
import NotFound from "./Pages/NotFound/NotFound";
import { Suspense } from "react";
import LoginPage from "./components/LoginForm/LoginForm";
import RegistrationPage from "./components/RegistrationForm/RegistrationForm.jsx";
axios.defaults.baseURL = "https://670423d1ab8a8f89273313e7.mockapi.io/";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadingContacts = async () => {
      dispatch(fetchContacts());
    };
    loadingContacts();
  }, [dispatch]);

  return (
    <div className="App">
      <Suspense fallback={<h2>Loading by suspense!</h2>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
