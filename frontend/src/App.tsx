import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Authorization from "./pages/Authorization";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/authorization" element={<Authorization />} />
      </Routes>
    </Router>
  );
};

export default App;
