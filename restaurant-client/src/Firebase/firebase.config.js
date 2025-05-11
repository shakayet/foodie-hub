// firebase.config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBArzTRGHcvJHEqXUwnqqo7kD1Cj7evFs8",
    authDomain: "restaurant-9c425.firebaseapp.com",
    projectId: "restaurant-9c425",
    storageBucket: "restaurant-9c425.firebasestorage.app",
    messagingSenderId: "809470314366",
    appId: "1:809470314366:web:236bf8c45d81b6da33952f"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
