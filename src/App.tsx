import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import NotFound from "./components/NotFound"
import Footer from "./components/Footer"
import Header from "./components/Header"
import "./App.css"


function App() {
  return <BrowserRouter>
  <Header />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
  <Footer />
  </BrowserRouter>
}

export default App
