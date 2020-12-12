import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyAMHfintOGfVBEVPNXIpx0QAlzbCah6rSg",
    authDomain: "telegram-21f75.firebaseapp.com",
    projectId: "telegram-21f75",
    storageBucket: "telegram-21f75.appspot.com",
    messagingSenderId: "550104051029",
    appId: "1:550104051029:web:4552e92049b1668a2f13dc",
    measurementId: "G-WH3B5X2XT1"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const db = firebaseApp.firestore();
export {auth,db};