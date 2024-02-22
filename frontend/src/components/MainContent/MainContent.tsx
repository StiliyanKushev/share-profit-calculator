import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/provider";

import HomeView from "../../views/HomeView/HomeView";
import LoginView from "../../views/LoginView/LoginView";
import RegisterView from "../../views/RegisterView/RegisterView";

const MainContent = () => {
  const { state: authState } = useContext(AuthContext);

  const isLoggedIn = authState.isLoggedIn;

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <HomeView /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginView /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!isLoggedIn ? <RegisterView /> : <Navigate to="/" replace />}
      />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default MainContent;
