import { ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/home.page";
import SignInPage from "./pages/signin.page";
import UserPage from "./pages/user.page";
import { theme } from "./shared/utils/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
