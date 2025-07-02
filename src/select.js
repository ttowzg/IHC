import { db } from "./db";
import { collection, getDocs } from "firebase/firestore";
export async function buscarMensagens() {
const mensagensRef = collection(db, "mensagens");
const snapshot = await getDocs(mensagensRef);
const lista = [];
snapshot.forEach((doc) => {
lista.push({ id: doc.id, ...doc.data() });
});
return lista;
}