import FormQuery from "../../container/formQuery/FormQuery";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

function Home () {
  return (
    <>
    <header>
      <Navbar />
    </header>
      <main className="mainContent">
        <FormQuery />
      </main>
      <footer>
      <Footer/>
      </footer>
    </>
  )
}
export default Home;
