// src/Entrada/Entrada.jsx - VERSÃO CORRIGIDA PARA A SUA ESTRUTURA

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// Agora vamos usar 'getDoc' para buscar um documento específico.
import { doc, getDoc } from "firebase/firestore";
import { db } from "../db";

function Entrada() {
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');
  const [dilemaEncontrado, setDilemaEncontrado] = useState(''); // Agora guarda apenas a frase (string)
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [listaDeDilemas, setListaDeDilemas] = useState([]);

  // Este useEffect carrega o documento único com todas as frases.
  useEffect(() => {
    const carregarDilemas = async () => {
      try {
        // Aponta diretamente para o seu documento 'dias'
        const docRef = doc(db, "dilemas_oraculo", "dias");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // Pega o objeto com todos os campos (dia1, dia10, etc.)
          const dados = docSnap.data();
          // Converte os valores desse objeto numa lista de frases
          const listaDeFrases = Object.values(dados);
          setListaDeDilemas(listaDeFrases);
        } else {
          setErro("Documento 'dias' não encontrado no Firebase.");
        }
      } catch (error) {
        console.error("Erro ao carregar dilemas:", error);
        setErro("Não foi possível conectar ao Oráculo.");
      } finally {
        setCarregando(false);
      }
    };

    carregarDilemas();
  }, []); // Executa apenas uma vez

  const handleSubmit = (event) => {
    event.preventDefault();
    setErro('');
    setDilemaEncontrado('');

    if (!dia || !mes) {
      setErro('Por favor, preencha o dia e o mês.');
      return;
    }
    if (listaDeDilemas.length === 0) {
      setErro("Nenhum dilema disponível para sorteio.");
      return;
    }

    // Sorteia uma frase aleatória da nossa lista de frases
    const indiceAleatorio = Math.floor(Math.random() * listaDeDilemas.length);
    const dilemaSorteado = listaDeDilemas[indiceAleatorio];

    setDilemaEncontrado(dilemaSorteado);
  };

  if (carregando) {
    return <p className="text-white text-lg">A carregar a sabedoria do Oráculo...</p>;
  }

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-gray-800">
      <h1 className="text-3xl font-bold text-center text-indigo-600">Oráculo Social</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="mes-input" className="block text-sm font-medium text-gray-700">Mês (1-12)</label>
          <input id="mes-input" type="number" value={mes} onChange={(e) => setMes(e.target.value)} placeholder="Ex: 7" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <div>
          <label htmlFor="dia-input" className="block text-sm font-medium text-gray-700">Dia (1-31)</label>
          <input id="dia-input" type="number" value={dia} onChange={(e) => setDia(e.target.value)} placeholder="Ex: 15" className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm" />
        </div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
          Revelar Dilema Aleatório
        </button>
      </form>

      {erro && <div className="mt-4 p-4 text-center bg-red-100 rounded-lg"><p className="text-md font-medium text-red-700">{erro}</p></div>}
      
      {/* **** AJUSTE FINAL NA EXIBIÇÃO **** */}
      {/* exibimos diretamente a frase sorteada, sem .titulo ou .mensagem */}
      {dilemaEncontrado && (
        <div className="mt-4 p-4 text-center bg-indigo-50 rounded-lg">
          <p className="text-lg text-indigo-800 mt-2">"{dilemaEncontrado}"</p>
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