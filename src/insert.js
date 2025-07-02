// src/insert.js

import { db } from "./db";
import { collection, addDoc } from "firebase/firestore";

// Função simplificada. A ordem não importa mais, pois vamos pegar todos.
export async function adicionarDilema(titulo, mensagem) {
  try {
    await addDoc(collection(db, "dilemas"), {
      titulo: titulo,
      mensagem: mensagem,
      criadoEm: new Date(),
    });
    console.log("Dilema adicionado com sucesso!");
    return true;
  } catch (e) {
    console.error("Erro ao adicionar dilema:", e);
    return false;
  }
}