import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./authentication/signup/Signup";
import LandingPage from "./LandingPage";
import Login from "./authentication/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Navigation from "./pages/navigation/Navigation";
import Question from "./pages/question/Question";
import ReactJS from "./pages/reactjs/ReactJS";
import QuestionAnswer from "./pages/reactjs/question-answer/QuestionAnswer";
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
          <Route path="/" element={<LandingPage />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="user" element={<Navigation />}>
            <Route index element={<Dashboard />} />
            <Route path="question" element={<Question />} />
            <Route path="reactjs" element={<ReactJS />} >
              <Route index element={<QuestionAnswer />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
