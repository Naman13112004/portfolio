import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Hero from "./components/hero";
import Projects from "./pages/projects";
import Skills from "./pages/skills";
import Contact from "./pages/contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="projects" element={<Projects />} />
          <Route path="skills" element={<Skills />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;