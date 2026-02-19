import LoginForm from "../forms/LoginForm";
import Navbar from "../navbar/Navbar";

 function Login () {

  return (
    <>
    <header>
      <Navbar />
    </header>
      <main className="mainContent">
        <LoginForm />
    </main>
    </>
  )
}
export default Login;