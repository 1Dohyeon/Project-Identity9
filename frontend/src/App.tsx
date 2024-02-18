import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import SignInPage from "./pages/SigninPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </Router>
  );
}

export default App;
