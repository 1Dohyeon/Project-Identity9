import { ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "./features/auth/context/authContext";
import ArticlesPage from "./pages/articles.page";
import HomePage from "./pages/home.page";
import RegisterPage from "./pages/register.page";
import SignInPage from "./pages/signin.page";
import UserPage from "./pages/user.page";
import { theme } from "./shared/utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<ArticlesPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
