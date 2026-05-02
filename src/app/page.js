import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./sections/Hero";
import ResortOverview from "./sections/ResortOverview";
import About from "./sections/About";
import Rooms from "./sections/Rooms";
import Amenities from "./sections/Amenities";
import NearbyAttractions from "./sections/NearbyAttractions";
import Gallery from "./sections/Gallery";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";

export default function Home() {
  return (
   
<><Hero />
      <div className="container">
         
        <About />
        <Rooms />
         </div>
        <Amenities />
        <div className="container">
        <NearbyAttractions />
        <Gallery />
       
        <ResortOverview />
 </div>
        <Testimonials />
        <Contact />
     

      </>
     
      
     
   
  );
}
