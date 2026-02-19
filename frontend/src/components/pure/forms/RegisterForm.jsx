import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../useContext/UserContext";
import "./forms.css";

function RegisterForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [secondPassword, setSecondPassword] = useState("");
  const { name, email, password } = user;

  const {setUser: setUserContext } = useContext(UserContext);
  const navigate = useNavigate();

  const showSecondPassword = (e) => {
    setSecondPassword(e.target.value);
  };

   const saveUserData = (e) => {
    const {name, value} = e.target;
    setUser((prevState) => 
    ({
      ...prevState,
      [name]: value
    }));
   }

  const sendUserData = (e) => {
    e.preventDefault();
    
    if (password === secondPassword) {
      setUserContext({
        name,
        email,
        password
      });
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } else {
      console.log(user)
      console.log("No coinciden");
    }
  };

  return (
    <div className="loginContent">
      <form onSubmit={sendUserData} className="formLogin">
        <label htmlFor="name">Nombre</label>
        <input 
        onChange={saveUserData}
        value={name} 
        name="name"
        type="text" 
        placeholder="Clara"></input>
        <label htmlFor="email">E-mail</label>
        <input 
        onChange={saveUserData}
        value={email} 
        name="email"
        type="email" 
        placeholder="clara@gmail.com">
        </input>
        <label htmlFor="password">Contraseña</label>
        <input
        onChange={saveUserData}
          value={password}
          name="password"
          type="password"
          placeholder="Al menos cinco caractéres y un número"
          pattern="(?=.*\d)(?=.*[a-zA-Z]).{5,}"
          title="Ha de tener al menos cinco letras y un número"
        ></input>
        <label htmlFor="secondPassword">Repetir Contraseña</label>
        <input
          onChange={showSecondPassword}
          value={secondPassword}
          name="secondPassword"
          type="password"
          placeholder="Las dos contraseñas han de coincidir"
        ></input>
        <button type="submit" className="buttonReg">
          Registrarse
        </button>
      </form>
    </div>
  );
}
export default RegisterForm;
