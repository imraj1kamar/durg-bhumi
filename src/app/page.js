import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Rooms from "./sections/Rooms";
import Amenities from "./sections/Amenities";
import NearbyAttractions from "./sections/NearbyAttractions";
import Gallery from "./sections/Gallery";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";

export default function Home() {
  return (
    <main className="container-fluid">
      <div className="row">
        <Hero />
        <About />
        <Rooms />
        <Amenities />
        <NearbyAttractions />
        <Gallery />
        <Testimonials />
        <Contact />

      </div>
     
      
     
    </main>
  );
}
