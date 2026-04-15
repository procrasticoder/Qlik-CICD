import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Console from "./pages/Console";
import MessageBanner from "./components/MessageBanner";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/console" element={<Console />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
      {/* <MessageBanner message="Company registered successfully!" type="error" /> */}
    </>
  );
}
