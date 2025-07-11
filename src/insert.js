// src/insert.js

import { db } from "./db";
import { collection, addDoc } from "firebase/firestore";

export async function adicionarDilema(titulo, mensagem) {
  try {
    // A coleção agora é a "dilemas_oraculo", onde a página principal vai ler.
    await addDoc(collection(db, "dilemas_oraculo"), {
      titulo: titulo,
      mensagem: mensagem,
      criadoEm: new Date(),
    });
    console.log("Dilema adicionado com sucesso à coleção 'dilemas_oraculo'!");
    return true;
  } catch (e) {
    console.error("Erro ao adicionar dilema:", e);
    return false;
  }
}