// src/App.jsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Entrada from "./Entrada/Entrada";
import Sobre from "./Sobre/Sobre";
import Adm from "./Adm/Adm.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Entrada />} />
            <Route path="/Sobre" element={<Sobre />} />
            <Route path="/Adm" element={<Adm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;