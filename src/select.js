// src/select.js

import { db } from "./db";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function buscarDilemas() {
  // Criamos uma query para buscar os dilemas e ordená-los pelo id_numerico
  const q = query(collection(db, "dilemas"), orderBy("id_numerico"));
  
  const snapshot = await getDocs(q);
  const lista = [];
  snapshot.forEach((doc) => {
    // Adicionamos o ID do documento e os dados à lista
    lista.push({ id: doc.id, ...doc.data() });
  });
  return lista;
}