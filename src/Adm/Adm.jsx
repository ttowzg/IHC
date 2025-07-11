// src/Adm/Adm.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { adicionarDilema } from '../insert'; // Importa a função corrigida

function Adm() {
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !mensagem) {
      setStatus('Por favor, preencha todos os campos.');
      return;
    }
    setStatus('A adicionar ao Oráculo...');
    const sucesso = await adicionarDilema(titulo, mensagem);
    if (sucesso) {
      setStatus('Dilema adicionado com sucesso!');
      setTitulo('');
      setMensagem('');
    } else {
      setStatus('Erro ao adicionar o dilema. Tente novamente.');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-green-50 p-8 border border-gray-300 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Página de Administração</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="titulo-input" className="block text-sm font-medium text-gray-700">Título</label>
          <input
            id="titulo-input"
            placeholder="Ex: Provérbio do Dia"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="mensagem-input" className="block text-sm font-medium text-gray-700">Mensagem do Dilema</label>
          <input
            id="mensagem-input"
            placeholder="Ex: Água mole em pedra dura..."
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button type="submit" className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Adicionar ao Banco de Dados
        </button>
      </form>
      {status && <p className="mt-4 text-center font-medium">{status}</p>}
      <div className="text-center mt-6">
        <Link to="/" className="text-indigo-600 hover:text-indigo-800">
          &larr; Voltar para o Oráculo
        </Link>
      </div>
    </div>
  );
}

export default Adm;