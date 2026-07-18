import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Nexus from "../components/Nexus";
import Process from "../components/Process";
import WhyUs from "../components/WhyUs";
import Testimonials from "../components/Testimonials";
import SuccessStories from "../components/SuccessStories";
import ScheduleMeeting from "../components/ScheduleMeeting";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Nexus />
        <Process />
        <WhyUs />
        <Testimonials />
        <SuccessStories />
        <ScheduleMeeting />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
