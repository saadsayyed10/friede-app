import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Authorization from "./pages/Authorization";
import SignUpBasic from "./pages/SignUp/SignUpBasic";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/authorization" element={<Authorization />} />
        <Route path="/signup/basic" element={<SignUpBasic />} />
      </Routes>
    </Router>
  );
};

export default App;
