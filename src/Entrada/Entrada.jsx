// src/Entrada/Entrada.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { buscarDilemas } from '../select';      // Nossa função que busca no Firebase
import { dilemasIniciais } from '../dilemas'; // Nossa lista local do arquivo JS

function Entrada() {
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [dilemaEncontrado, setDilemaEncontrado] = useState(null);
  const [erro, setErro] = useState('');
  
  // Este estado vai guardar a lista COMPLETA (local + banco)
  const [listaCompletaDilemas, setListaCompletaDilemas] = useState(dilemasIniciais);
  const [carregando, setCarregando] = useState(true);

  // useEffect para buscar os dilemas *adicionais* do Firebase
  useEffect(() => {
    async function carregarDilemasAdicionais() {
      try {
        const dilemasDoBanco = await buscarDilemas();
        // Junta a lista inicial do arquivo com a lista que veio do banco
        setListaCompletaDilemas([...dilemasIniciais, ...dilemasDoBanco]);
      } catch (error) {
        console.error("Erro ao buscar dilemas do Firebase, usando apenas a lista local:", error);
        // Se der erro, o site continua funcionando com a lista local!
      } finally {
        setCarregando(false);
      }
    }
    carregarDilemasAdicionais();
  }, []); // O array vazio [] faz isso rodar só uma vez

  const handleSubmit = (event) => {
    event.preventDefault();
    setErro('');
    setDilemaEncontrado(null);

    // Validação de entrada
    const diaNum = parseInt(dia, 10);
    const mesNum = parseInt(mes, 10);
    if (!diaNum || !mesNum || mesNum < 1 || mesNum > 12 || diaNum < 1 || diaNum > 31) {
      setErro('Por favor, insira um dia e um mês válidos.');
      return;
    }

    // A fórmula mágica agora usa a lista COMPLETA
    const indice = (diaNum - 1 + mesNum - 1) % listaCompletaDilemas.length;
    
    setDilemaEncontrado(listaCompletaDilemas[indice]);
  };

  if (carregando) {
    return <p>Carregando Oráculo...</p>;
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-gray-800">
      <h1 className="text-3xl font-bold text-center text-indigo-600">Oráculo Social</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Formulário continua o mesmo */}
        <div>
          <label htmlFor="mes-input" className="block text-sm font-medium text-gray-700">Mês (1-12)</label>
          <input id="mes-input" type="number" value={mes} onChange={(e) => setMes(e.target.value)} placeholder="Ex: 7" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"/>
        </div>
        <div>
          <label htmlFor="dia-input" className="block text-sm font-medium text-gray-700">Dia (1-31)</label>
          <input id="dia-input" type="number" value={dia} onChange={(e) => setDia(e.target.value)} placeholder="Ex: 15" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm"/>
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Revelar Dilema do Dia
        </button>
      </form>

      {erro && <div className="mt-4 p-4 text-center bg-red-100 rounded-lg"><p className="text-md font-medium text-red-700">{erro}</p></div>}
      
      {dilemaEncontrado && (
        <div className="mt-4 p-4 text-center bg-indigo-50 rounded-lg">
          <p className="text-md font-semibold text-gray-600">{dilemaEncontrado.titulo}:</p>
          <p className="text-lg text-indigo-800 mt-2">"{dilemaEncontrado.mensagem}"</p>
        </div>
      )}
      
      <div className="text-center mt-4">
        <Link to="/Adm" className="font-medium text-gray-600 hover:text-gray-500">
          Página do Admin
        </Link>
      </div>
    </div>
  );
}

export default Entrada;