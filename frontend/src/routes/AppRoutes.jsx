import { Routes, Route } from "react-router-dom";
import Home from "../components/pure/pages/Home";
import Register from "../components/pure/pages/Register";
import Login from "../components/pure/pages/Login";
import Bookshelf from "../components/pure/pages/Bookshelf";
import Library from "../components/pure/pages/Library";

function AppRoutes() {
  return (
    <Routes>
      <>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/bookshelf" element={<Bookshelf/>}/>
        <Route exact path="/library" element={<Library/>} />
      </>
    </Routes>
  );
}
export default AppRoutes;
