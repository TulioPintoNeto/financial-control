import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { environment } from '../../environment';

const initialization = () => {
  const app = initializeApp(environment.firebaseConfig);
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
