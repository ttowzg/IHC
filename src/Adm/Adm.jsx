// src/Adm/Adm.jsx

import { useState } from "react";
import { Link } from "react-router-dom";
import { adicionarDilema } from '../insert'; // Importar a nova função

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
    setStatus('Adicionando...');
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
    <div className="mx-auto mt-10 bg-green-50 p-8 border border-gray-300 rounded-lg">
      <h1>Página de Administração do Oráculo</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Título (Ex: Flor do Dia)"
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
        />
        <input
          placeholder="Mensagem do Dilema"
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Adicionar ao Banco de Dados
        </button>
      </form>
      {status && <p className="mt-4 text-center">{status}</p>}
      <Link to="/" className="block text-center mt-4 text-indigo-600"> Voltar para o Oráculo </Link>
    </div>
  );
}

export default Adm;