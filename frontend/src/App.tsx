import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import MainContent from "./components/MainContent/MainContent";
import NavMenu from "./components/NavMenu/NavMenu";
import { AuthProvider } from "./contexts/Auth/provider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer />
        <header>
          <NavMenu />
        </header>
        <main>
          <MainContent />
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
