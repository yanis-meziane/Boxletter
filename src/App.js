import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/loginUser";
import Register from "./register/register"
import Home from "./Home/Home"
import Main from "./main/main"

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    );
  }
export default App;