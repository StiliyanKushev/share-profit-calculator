import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../contexts/Auth/provider";

import { StockProvider } from "../../contexts/Stock/provider";
import ErrorView from "../../views/ErrorView/ErrorView";
import HomeView from "../../views/HomeView/HomeView";
import LoginView from "../../views/LoginView/LoginView";
import RegisterView from "../../views/RegisterView/RegisterView";

const MainContent: React.FC = () => {
  const { state: authState } = useContext(AuthContext);
  const isLoggedIn = authState.isLoggedIn;

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <StockProvider>
              <HomeView />
            </StockProvider>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/login"
        element={!isLoggedIn ? <LoginView /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register"
        element={!isLoggedIn ? <RegisterView /> : <Navigate to="/" replace />}
      />
      <Route path="/404" element={<ErrorView />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default MainContent;
