import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WorldPage from "@/pages/WorldPage";
import Portfolio2D from "@/pages/Portfolio2D";
import { WebGLFallback } from "@/components/overlay/WebGLFallback";
import { NoiseOverlay } from "@/components/overlay/NoiseOverlay";
import { isWebGLAvailable } from "@/lib/webgl";

function App() {
  const webgl = isWebGLAvailable();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={webgl ? <WorldPage /> : <WebGLFallback />} />
          <Route path="/portfolio" element={<Portfolio2D />} />
        </Routes>
      </BrowserRouter>
      <NoiseOverlay />
    </div>
  );
}

export default App;
