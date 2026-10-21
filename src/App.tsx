import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout";
// Legacy components
import Hero from "./components/hero";
import Projects from "./pages/projects";
import Skills from "./pages/skills";
import Blog from "./pages/blog";
import Achievements from "./pages/achievements";
import PrototypeApp from "./prototype/PrototypeApp";
import LensView from "./pages/lens-view";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Overview / Explore workspace, switched by lensMode */}
          <Route index element={<LensView />} />

          {/* Contact is an in-page section of the Overview; keep old links working */}
          <Route path="contact" element={<Navigate to="/#contact" replace />} />
          
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