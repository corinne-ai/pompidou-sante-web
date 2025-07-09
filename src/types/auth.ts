
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'secretary' | 'admin';
  dateOfBirth?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
