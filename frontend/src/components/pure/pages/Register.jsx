import RegisterForm from "../forms/RegisterForm";
import Navbar from "../navbar/Navbar";

function Home () {
  return (
    <>
        <header>
          <Navbar />
        </header>
      <main className="mainContent">
        <RegisterForm />
      </main>
    </>
  )
}
export default Home;
