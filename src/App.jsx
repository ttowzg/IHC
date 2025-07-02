import { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Entrada from "./Entrada/Entrada";
import Sobre from "./Sobre/Sobre";
import { adicionarMensagem } from "./insert";
import Adm from "./Adm/Adm.jsx";

function App() {
    useEffect(() => {
adicionarMensagem("Mensagem de teste 1");
adicionarMensagem("Mensagem de teste 2");
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