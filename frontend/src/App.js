import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
