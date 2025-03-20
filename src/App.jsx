import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import MyComponent from "./AnswerSheet/MyComponent.jsx";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EngineComponent from "./AnswerSheet/EngineComponent.jsx";

import MyNavbar from "./AnswerSheet/Navbar.jsx";
import { Container } from "react-bootstrap";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      <Router>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<MyComponent />} />
          <Route path="/Reciprocating-Engine" element={<EngineComponent />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
