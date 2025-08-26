import React from 'react'
import Navbar from "../Navbar/Navbar";
import Hero from "../Hero/Hero";
import Testimoney from "../Testimoney/Testimoney";
import Cta from "../CTA/Cta";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import Programs from '../Programs/Programs'; 

const Home = () => {
  return (
    <div>
      <Hero />
      <Programs />
      <Testimoney />
      <Cta />
      <div id="contact-us">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}

export default Home
