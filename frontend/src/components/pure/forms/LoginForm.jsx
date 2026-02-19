import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../useContext/UserContext";
import "./forms.css";
function LoginForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { email, password } = user;
  const { setUser: setUserContext } = useContext(UserContext);

  const navigate = useNavigate();

  const saveLogin = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendUserData = (e) => {
    e.preventDefault();
    const storageData = localStorage.getItem("user");
    if (storageData) {
      const userData = JSON.parse(storageData);
      const nameStorage = userData.name;
      const emailStorage = userData.email;
      const passwordStorage = userData.password;
      if (emailStorage === email && passwordStorage === password) {
        setUserContext({
          name: nameStorage,
          email: emailStorage,
        });
        navigate("/");
      } else {
        console.log(passwordStorage);
      }
    }
  };

  return (
    <div>
      <div className="loginContent">
        <form onSubmit={sendUserData} className="formLogin">
          <label htmlFor="email">E-mail</label>
          <input
            onChange={saveLogin}
            value={email}
            name="email"
            type="email"
            placeholder="clara@gmail.com"
          ></input>
          <label htmlFor="password">Contraseña</label>
          <input
            onChange={saveLogin}
            value={password}
            name="password"
            type="password"
            placeholder="Al menos cinco caractéres y un número"
            pattern="(?=.*\d)(?=.*[a-zA-Z]).{5,}"
            title="Ha de tener al menos cinco letras y un número"
          ></input>
          <button type="submit" className="buttonReg">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
export default LoginForm;
