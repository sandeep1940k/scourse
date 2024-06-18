import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./authentication/Signup";
import LandingPage from "./LandingPage";
import Login from "./authentication/Login";
import Dashboard from "./pages/Dashboard";
import Navigation from "./pages/Navigation";
function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Navigation />}> */}
            {/* <Route index element={<Dashboard />} /> */}
            {/* <Route path="*" element={<NoPage />} /> */}
          {/* </Route> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
