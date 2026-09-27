import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Contact from "./pages/contact";
// Legacy components
import Hero from "./components/hero";
import Projects from "./pages/projects";
import Skills from "./pages/skills";
import Blog from "./pages/blog";
import Achievements from "./pages/achievements";
import PrototypeApp from "./prototype/PrototypeApp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Foundation for new unified experience */}
          <Route index element={<div className="min-h-screen pt-32 px-6 md:px-12 max-w-4xl mx-auto"><h1 className="text-3xl font-bold">Living Blueprint Foundation Ready</h1></div>} />
          
          {/* Preserved Business Logic */}
          <Route path="contact" element={<Contact />} />
          
          {/* Legacy Routes (Deprecated) */}
          <Route path="legacy-hero" element={<Hero />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="blog" element={<Blog />} />
          <Route path="achievements" element={<Achievements />} />
        </Route>
        <Route path="/prototype" element={<PrototypeApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;