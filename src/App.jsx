import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Entrada from "./Entrada/Entrada";
import Sobre from "./Sobre/Sobre";
import { adicionarDilema } from "./insert";
import Adm from "./Adm/Adm.jsx";

function App() {
    useEffect(() => {
adicionarDilema("Mensagem de teste 1", "teste 1");
adicionarDilema("Mensagem de teste 2", "teste 2");
}, []);
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
</BrowserRouter> </> ); 
}
export default App;