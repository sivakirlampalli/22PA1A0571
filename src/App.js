// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShortenerForm from './components/ShortenerForm';
import ShortenerStats from './components/ShortenerStats';
import RedirectPage from './components/RedirectPage';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';



const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff9800',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<ShortenerForm />} />
          <Route path="/stats" element={<ShortenerStats />} />
          <Route path="/:shortcode" element={<RedirectPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
