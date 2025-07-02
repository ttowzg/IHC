// src/Entrada/Entrada.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { dilemas } from '../dilemas'; // Importa nossa lista de dilemas

function Entrada() {
  // Estados para controlar os inputs, o resultado e os erros
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [dilemaEncontrado, setDilemaEncontrado] = useState('');
  const [erro, setErro] = useState('');

  // Função chamada quando o formulário é enviado
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita que a página recarregue ao clicar no botão
    setErro('');
    setDilemaEncontrado('');

    const diaNum = parseInt(dia, 10);
    const mesNum = parseInt(mes, 10);

    // Validação dos dados de entrada
    if (!diaNum || !mesNum || mesNum < 1 || mesNum > 12 || diaNum < 1 || diaNum > 31) {
      setErro('Por favor, insira um dia e um mês válidos.');
      return;
    }
    const dataValida = new Date(2024, mesNum - 1, diaNum);
    if (dataValida.getMonth() !== mesNum - 1) {
      setErro(`O dia ${diaNum} não existe no mês ${mesNum}.`);
      return;
    }

    // A fórmula mágica para encontrar o dilema
    const indice = (diaNum - 1 + mesNum - 1) % dilemas.length;
    setDilemaEncontrado(dilemas[indice]);
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-gray-800">
      <h1 className="text-3xl font-bold text-center text-indigo-600">Oráculo Social</h1>
      
      {/* Usamos a tag <form> com o evento onSubmit */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="mes-input" className="block text-sm font-medium text-gray-700">
            Mês (1-12)
          </label>
          <input
            id="mes-input"
            type="number"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            placeholder="Ex: 7"
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label htmlFor="dia-input" className="block text-sm font-medium text-gray-700">
            Dia (1-31)
          </label>
          <input
            id="dia-input"
            type="number"
            value={dia}
            onChange={(e) => setDia(e.target.value)}
            placeholder="Ex: 15"
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button 
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Revelar Dilema do Dia
        </button>
      </form>

      {/* Área para exibir o resultado ou o erro */}
      {erro && (
        <div className="mt-4 p-4 text-center bg-red-100 rounded-lg">
          <p className="text-md font-medium text-red-700">{erro}</p>
        </div>
      )}
      {dilemaEncontrado && (
        <div className="mt-4 p-4 text-center bg-indigo-50 rounded-lg">
          <p className="text-md font-semibold text-gray-600">Seu dilema é:</p>
          <p className="text-lg text-indigo-800 mt-2">"{dilemaEncontrado}"</p>
        </div>
      )}
      
      <div className="text-center mt-4">
        {/* Mantemos o link para a página Sobre que você já tinha */}
        <Link to="/Sobre" className="font-medium text-indigo-600 hover:text-indigo-500">
          O que é isso?
        </Link>
      </div>
    </div>
  );
}

export default Entrada;