import { db } from "./db";
import { collection, addDoc } from "firebase/firestore";
export async function adicionarMensagem(texto) {
try {
await addDoc(collection(db, "mensagens"), {
texto,
criadoEm: new Date(),
});
console.log("Mensagem adicionada com sucesso!");
} catch (e) {
console.error("Erro ao adicionar mensagem:", e);
}
}