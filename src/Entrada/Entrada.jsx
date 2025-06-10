import { Link } from "react-router-dom";
function Entrada() {
return (
<div >
<h1> Oráculo </h1>
<form>
<input placeholder="Nome" type="text"></input>
<input placeholder="Data de nascimento" type="date"></input>
<button>Resposta do Oráculo </button>
</form>
<Link to="/Sobre"> Clique para saber mais </Link>
</div>
); }
export default Entrada;