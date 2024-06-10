import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./authentication/Signup";
import LandingPage from "./LandingPage";
import Login from "./authentication/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
