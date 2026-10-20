import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Authorization from "./pages/Authorization";
import SignUpBasic from "./pages/SignUp/SignUpBasic";
import SignUpReview from "./pages/SignUp/SignUpReview";
import Dashboard from "./pages/Verified/Dashboard";
import Settings from "./pages/Verified/Settings";
import SSOCallback from "./pages/SSOCallback";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/sso-callback" element={<SSOCallback />} />

        <Route path="/authorization" element={<Authorization />} />
        <Route path="/signup/basic" element={<SignUpBasic />} />
        <Route path="/signup/review" element={<SignUpReview />} />

        <Route path="/friede" element={<Dashboard />} />
        <Route path="/friede/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};

export default App;
