import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import UnderConstruction from "./pages/UnderConstruction";
import { SlideshowProvider } from "./components/SlideshowContext";
import Travel from "./pages/Travel";
import Resume from "./pages/Resume";
import Music from "./pages/Music";
import Drama from "./pages/Drama";

export default function App() {
  return (
    <SlideshowProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/resume" element={<Resume />} />

        <Route path="/music" element={<Music />} />

        <Route path="/drama" element={<Drama />} />

        <Route path="/travel" element={<Travel />} />

        <Route
          path="/projects"
          element={<UnderConstruction title="PROJECTS" subtitle="專案" />}
        />
      </Routes>
    </SlideshowProvider>
  );
}