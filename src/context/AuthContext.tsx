import React from 'react';
import { useRouter } from 'next/router';
import { api } from 'services/api';

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthContext {
  signIn: (dataLogin: AuthProps) => void;
  signOut: () => void;
}

type AuthProps = {
  username: string;
  password: string;
};

const AuthContext = React.createContext({} as IAuthContext);

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const router = useRouter();

  const signIn = async (dataLogin: AuthProps) => {
    try {
      router.push('/home');
    } catch (error: any) {
      throw error;
    }
  };

  const signOut = async () => {
    try {
      router.push('/login');
      api.defaults.headers.Authorization = '';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
