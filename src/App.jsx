import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Entrada from "./Entrada/Entrada";
import Sobre from "./Sobre/Sobre";

function App() {
return (
<>
<BrowserRouter>
<Routes>
<Route path="/" element={<Entrada />} />
<Route path="/Sobre" element={<Sobre />} />
</Routes>
</BrowserRouter> </> ); }
export default App;