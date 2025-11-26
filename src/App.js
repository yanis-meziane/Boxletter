import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/loginUser";
import Register from "./register/register"

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    );
  }
export default App;