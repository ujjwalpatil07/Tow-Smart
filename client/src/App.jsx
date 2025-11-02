import "./App.css"
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Routers from "./Routes/Routers"
import { ToastContainer } from "react-toastify";


function App() {

  return (
    <>
      <Navbar/>
      <main className="w-screen bg-gradient-to-br from-white to-amber-100 ">
        <Routers />
        <ToastContainer />
      </main>
      <Footer/>
    </>
  )
}

export default App
