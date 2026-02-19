import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  
  const handleMenuButton = () => {
    setOpenMenu(!openMenu);
  };
 

  return (
    <div className="navbarContent">
    <div className="navbarInfo">
      <h1 className="title"><Link to="/">Check Books</Link></h1>
      <button
        className={`spanMenuButton ${openMenu ? "open" : ""}`}
        onClick={handleMenuButton}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      </div>
      <nav className={`navMenu ${openMenu ? "open" : ""}`}>
        <ul className="menuList">
          <li className="menuItem">
            <NavLink to="/bookshelf">Estantería</NavLink>
          </li>
          <li className="menuItem">
            <NavLink to="/library">Biblioteca</NavLink>
          </li>
          <li className="menuItem">
            <NavLink to="/login">Iniciar Sesión</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
