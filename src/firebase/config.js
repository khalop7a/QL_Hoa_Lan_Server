import * as firebase  from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import "firebase/storage"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDoZJsWHsZOIqBlt3VPaogWEmmDwQnEujw",
    authDomain: "hoalanmanager.firebaseapp.com",
    projectId: "hoalanmanager",
    storageBucket: "hoalanmanager.appspot.com",
    messagingSenderId: "98590753482",
    appId: "1:98590753482:web:6482056cef8411fa27ea33",
    measurementId: "G-D6J5FCEV3Z"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { firebase, storage };
