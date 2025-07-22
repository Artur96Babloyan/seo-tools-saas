export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string; // Optional avatar URL
  firstName?: string; // Optional first name for better display
  lastName?: string; // Optional last name for better display
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    user: User;
    token: string;
  };
  message: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

export interface AuthError {
  message: string;
  statusCode?: number;
} 