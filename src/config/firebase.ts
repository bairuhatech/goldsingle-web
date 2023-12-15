import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDJ-IcHO1eMl76OKPry0Mzyx5XajgH57ZY",
  authDomain: "nextme-9b859.firebaseapp.com",
  projectId: "nextme-9b859",
  storageBucket: "nextme-9b859.appspot.com",
  messagingSenderId: "154621599051",
  appId: "1:154621599051:web:4380c2a20f36212eeb1cce",
  measurementId: "G-548R8YVD21",
};
const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
const GoogleProvide = new GoogleAuthProvider();
export { Auth, GoogleProvide };
