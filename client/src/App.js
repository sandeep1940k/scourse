import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./authentication/Signup";
import LandingPage from "./LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
