import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/loginUser";
import Register from "./register/register"
import Home from "./Home/Home"
import Main from "./main/main"
import Admin from "./admin/admin"
import FormFilm from "./admin/formFilm"
import Layout from "./layout/layout";

  function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/admin" element={<Admin />} />
          <Route path='/movies' element={<FormFilm />} />
        </Routes>
      </BrowserRouter>
    );
  }
  
export default App;