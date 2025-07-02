import { Link } from "react-router-dom";
function Adm() {
return (
<div className="mx-auto mt-10 bg-green-50 p-8 border border-gray-300 rounded-r-lg"><h1> Oráculo </h1>
<form>
<input placeholder= "Flor escolhida" type="text"></input>
<input placeholder="Mensagem" type="text"></input>
<Link to="/Resposta">
<button>Adicionar ao banco de dados</button>
</Link>
</form>
<Link to="/Sobre"> Clique para saber mais </Link>
</div>
);
}
export default Adm;