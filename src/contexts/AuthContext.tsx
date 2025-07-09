
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User, LoginCredentials } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  // Médecins
  { id: '1', email: 'martin@pompidou.fr', name: 'Dr. Martin', role: 'doctor', dateOfBirth: '1975-03-15' },
  { id: '2', email: 'leonie@pompidou.fr', name: 'Dr. Léonie', role: 'doctor', dateOfBirth: '1980-07-22' },
  // Secrétaires
  { id: '3', email: 'justin@hopitalpom.fr', name: 'Justin', role: 'secretary', dateOfBirth: '1990-11-08' },
  // Patients
  { id: '4', email: 'ulrich@gmail.com', name: 'Ulrich', role: 'patient', dateOfBirth: '1985-12-03' },
  { id: '5', email: 'corinne@gmail.com', name: 'Corinne', role: 'patient', dateOfBirth: '1992-05-18' },
  // Administrateurs
  { id: '6', email: 'joseph@techpom.fr', name: 'Joseph', role: 'admin', dateOfBirth: '1970-09-25' },
  { id: '7', email: 'bruno@techpom.fr', name: 'Bruno', role: 'admin', dateOfBirth: '1978-01-14' },
];

const generatePassword = (dateOfBirth: string, role: string): string => {
  if (role === 'admin') {
    // 5 caractères pour les admins
    return dateOfBirth.replace(/-/g, '').slice(-5);
  }
  // 8 caractères (date à l'envers) pour les autres
  return dateOfBirth.replace(/-/g, '').split('').reverse().join('');
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('hospitalUser');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    const user = mockUsers.find(u => u.email === credentials.email);
    
    if (!user) return false;

    const expectedPassword = generatePassword(user.dateOfBirth!, user.role);
    
    if (credentials.password === expectedPassword) {
      setAuthState({
        user,
        isAuthenticated: true,
      });
      localStorage.setItem('hospitalUser', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('hospitalUser');
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
