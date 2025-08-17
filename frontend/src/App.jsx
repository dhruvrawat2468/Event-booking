import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LandingPage from "./pages/Index";
import { useState } from "react";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {!isAuthenticated ? (
        <LandingPage onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <>
          <Navbar />
          <HeroSection />
          <Services />
          <About />
          <Contact />
          <Footer />
        </>
      )}
      <Toaster />
    </Router>
  );
};

export default App;
