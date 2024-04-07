import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCXQLHI4Tovavgh7p5udtoCb8jKhNohfW0',
  authDomain: 'tulio-financial-control.firebaseapp.com',
  projectId: 'tulio-financial-control',
  storageBucket: 'tulio-financial-control.appspot.com',
  messagingSenderId: '963369908915',
  appId: '1:963369908915:web:2ee3a2e52f6bcbbcee4ec6',
};

const initialization = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  return {
    firebase: {
      auth,
      provider,
    },
  };
};

export const singletons = initialization();
