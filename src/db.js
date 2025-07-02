import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Configuração do Firebase
const firebaseConfig = {
apiKey: "AIzaSyDupBaSw8qaaVdBil5Xacow9OE8tLFXp5k",
authDomain: "oraculoihc.firebaseapp.com",
projectId: "oraculoihc",
storageBucket: "oraculoihc.firebasestorage.app",
messagingSenderId: "218812778994",
appId: "1:218812778994:web:634a9c481e15a8e90f436b",
measurementId: "G-PJS4PH7V9Z",
};
// Inicializa o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);