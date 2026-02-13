import HomeClient from "./components/HomeClient";
import AboutUs from "./components/AboutUs";
import RivaSection from "./components/RivaSection";
import InitiativesSection from "./components/InitiativesSection";
import ClusterCarousel from "./components/ClusterCarousel";
import EventsSection from "./components/EventsSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <HomeClient>
      <AboutUs />
      <RivaSection />
      <InitiativesSection />
      <ClusterCarousel />
      <EventsSection />
      <Footer />
    </HomeClient>
  );
}
