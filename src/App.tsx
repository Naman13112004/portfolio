// src/App.tsx

import Hero from "./components/hero";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import Projects from "./components/projects";
import SkillsAndLearning from "./components/skills-learning";

import { portfolioData } from './data/portfolio';

function App() {
  return (
    <div className="relative bg-white dark:bg-black">
      {/* The 'bg-white' on main is crucial for the footer reveal effect. 
        It covers the footer until you scroll to the very bottom.
      */}
      <main className="relative z-10 bg-white dark:bg-black shadow-2xl mb-100">
        <Navbar />
        <Hero />
        <div id="learning"></div> {/* Anchor for nav */}
        <SkillsAndLearning />
        <Projects />
        
        {/* Contact/CTA Section inside main to ensure separation from footer */}
        <section className="py-20 bg-gray-50 dark:bg-zinc-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl font-bold mb-6 dark:text-white">Ready to create impact?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              I am currently open to opportunities in Full Stack Development and DevOps.
            </p>
            <a href={`mailto:${portfolioData.personalInfo.email}`} className="inline-block px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-medium transition-transform hover:scale-105">
              Get In Touch
            </a>
          </div>
        </section>
      </main>

      {/* The Revealed Footer */}
      <Footer />
    </div>
  );
}

export default App;