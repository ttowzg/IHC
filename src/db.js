// src/db.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
// Certifique-se de que estas chaves estão corretas e ativas no seu projeto Firebase.

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM-PXKujJ8HjLyACePNpl5OAx8ow8cgzo",
  authDomain: "oraculoihc-4934c.firebaseapp.com",
  projectId: "oraculoihc-4934c",
  storageBucket: "oraculoihc-4934c.firebasestorage.app",
  messagingSenderId: "184432773725",
  appId: "1:184432773725:web:fe56dc7ecfce58c86b5bb4",
  measurementId: "G-H0E5Z6QCTJ",
};

// Inicializa o Firebase e o Firestore
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
