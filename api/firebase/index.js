import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAMXZxJo8CMX0V5sa5HnO_ne-BSjsD8izw",
  authDomain: "notetaking-4f676.firebaseapp.com",
  projectId: "notetaking-4f676",
  storageBucket: "notetaking-4f676.appspot.com",
  messagingSenderId: "508481845074",
  appId: "1:508481845074:web:aa6a84734cc58e3172ac8b",
  measurementId: "G-HKP789CXLT"
};

const App = initializeApp(firebaseConfig);
export default App;