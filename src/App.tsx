import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import UnderConstruction from "./pages/UnderConstruction";
import { SlideshowProvider } from "./components/SlideshowContext";
import Travel from "./pages/Travel";

export default function App() {
  return (
    <SlideshowProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route
          path="/resume"
          element={<UnderConstruction title="RESUME" subtitle="履歷" />}
        />

        <Route
          path="/music"
          element={<UnderConstruction title="MUSIC" subtitle="音樂" />}
        />

        <Route
          path="/drama"
          element={<UnderConstruction title="DRAMA" subtitle="追劇" />}
        />

        <Route path="/travel" element={<Travel />} />

        <Route
          path="/projects"
          element={<UnderConstruction title="PROJECTS" subtitle="專案" />}
        />
      </Routes>
    </SlideshowProvider>
  );
}