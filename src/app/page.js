import Herosection from "./components/sections/Herosection";
import Experience from "./components/sections/Experience";
import ProjectsSection from "./components/sections/ProjectsSection";
import ContactSection from "./components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <Herosection />
      <Experience />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
