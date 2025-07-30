import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShortenerForm from "./components/ShortenerForm";
import ShortenerStats from "./components/ShortenerStats";
import RedirectPage from "./components/RedirectPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShortenerForm />} />
        <Route path="/stats" element={<ShortenerStats />} />
        <Route path="/:shortcode" element={<RedirectPage />} />
      </Routes>
    </Router>
  );
}

export default App;
