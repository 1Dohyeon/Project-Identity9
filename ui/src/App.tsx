import { ThemeProvider } from "@mui/material";
import { theme } from "./shared/utils/theme";

function App() {
  return <ThemeProvider theme={theme}>hi</ThemeProvider>;
}

export default App;
