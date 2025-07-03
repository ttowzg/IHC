// src/Entrada/Entrada.jsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../db";

function Entrada() {
  // Estados para os inputs do utilizador
  const [dia, setDia] = useState('');
  const [mes, setMes] = useState('');

  // Estados para controlar o resultado e a interface
  const [dilemaEncontrado, setDilemaEncontrado] = useState(null);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  // Estado para guardar a lista de TODOS os dilemas vindos do Firebase
  const [listaDeDilemas, setListaDeDilemas] = useState([]);

  // useEffect para carregar os dilemas do Firebase APENAS UMA VEZ
  useEffect(() => {
    const carregarDilemas = async () => {
      // ***** VALORES CORRIGIDOS DE ACORDO COM A SUA IMAGEM *****
      const nomeDaColecao = 'dilemas_oraculo'; // Corrigido!
      const idDoDocumento = 'dias';            // Corrigido!
      // **********************************************************

      try {
        const docRef = doc(db, nomeDaColecao, idDoDocumento);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const dados = docSnap.data();
          const lista = Object.values(dados);
          setListaDeDilemas(lista);
        } else {
          setErro("Documento de dilemas não encontrado no Firebase.");
        }
      } catch (error) {
        console.error("Erro ao carregar dilemas:", error);
        setErro("Não foi possível conectar ao Oráculo.");
      } finally {
        setCarregando(false);
      }
    };

    carregarDilemas();
  }, []); // O array vazio [] faz com que isto execute apenas uma vez

  const handleSubmit = (event) => {
    event.preventDefault();
    setErro('');
    setDilemaEncontrado(null);

    if (!dia || !mes) {
      setErro('Por favor, preencha o dia e o mês.');
      return;
    }
    
    if (listaDeDilemas.length === 0) {
      setErro("Ainda a carregar os dilemas ou não foi possível encontrá-los.");
      return;
    }

    const indiceAleatorio = Math.floor(Math.random() * listaDeDilemas.length);
    const dilemaSorteado = listaDeDilemas[indiceAleatorio];

    setDilemaEncontrado(dilemaSorteado);
  };

  if (carregando) {
    return <p>A aquecer os motores do Oráculo...</p>;
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