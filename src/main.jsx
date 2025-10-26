import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from './App.jsx'

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#9c27b0" },
    secondary: { main: "#ed6c02" },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
      </ThemeProvider>
  </StrictMode>,
)
