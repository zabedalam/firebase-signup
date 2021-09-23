import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSANGING_SENDER_ID,
    appId: process.env.APP_ID,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users-tp/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName } = additionalData;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: new Date(),
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};
