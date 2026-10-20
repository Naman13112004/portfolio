import type { MouseEvent } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../lib/AppContext";
import { lensNavigation, scrollToContact } from "../lib/lens-navigation";
import type { Lens } from "../lib/lens-navigation";
import Footer from "./footer";
import SiteHeader from "./site-header";
import { AnimatePresence } from "framer-motion";
import ProjectDeepDive from "./project/ProjectDeepDive";
import { portfolioData } from "../data/portfolio";

const Layout = () => {
  const { lensMode, setLensMode, switchLens, activeProject } = useApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Overview and Explore live at "/". Legacy routes share the header but are not lens views.
  const isHome = pathname === "/";

  const activeProjectData = activeProject
    ? portfolioData.projects.find(p => p.title === activeProject)
    : null;

  const handleLensChange = (next: Lens) => {
    if (isHome) {
      switchLens(next);
    } else {
      setLensMode(next);
      navigate("/");
    }
  };

  const handleBrandClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isHome) {
      event.preventDefault();
      switchLens("overview");
    } else {
      setLensMode("overview");
    }
  };

  const handleContact = () => {
    if (!isHome) {
      navigate({ pathname: "/", hash: "#contact" });
    } else if (lensNavigation.committedLens === "overview") {
      scrollToContact();
    } else {
      switchLens("overview", { scrollTo: "contact" });
    }
  };

  return (
    <div className="relative bg-[var(--color-canvas)] min-h-screen text-[var(--color-ink)] font-sans">

      {/* Global Navigation Shell */}
      <SiteHeader
        activeLens={isHome ? lensMode : null}
        onLensChange={handleLensChange}
        onBrandClick={handleBrandClick}
        onContact={handleContact}
      />

      <main className="relative z-10 min-h-screen pt-[var(--header-height)]">
        <Outlet />
      </main>

      <Footer />

      <AnimatePresence>
        {activeProjectData && (
          <ProjectDeepDive project={activeProjectData} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Layout;
