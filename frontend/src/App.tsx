import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Authorization from "./pages/Authorization";
import SignUpBasic from "./pages/SignUp/SignUpBasic";
import SignUpReview from "./pages/SignUp/SignUpReview";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/signup/basic" element={<SignUpBasic />} />
        <Route path="/signup/review" element={<SignUpReview />} />
      </Routes>
    </Router>
  );
};

export default App;
