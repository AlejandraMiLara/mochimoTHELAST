import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AuthUser } from '../types';
import { login, logout, register } from '../services/auth.service';
import type { LoginData, RegisterData } from '../services/auth.service';

import { getMyProfile } from '../services/profile.service';

/**
 * Define la forma de los datos que compartirá el Contexto
 */
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * Crea el Contexto con valores por defecto (necesarios para TypeScript)
 */
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

/**
 * Define las props que recibirá el componente Proveedor
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Este es el componente Proveedor que envuelve la aplicación
 * y maneja el estado de autenticación.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * EFECTO 1: Verificación de Sesión
   * Se ejecuta 1 vez cuando la app carga.
   * Intenta obtener /profile/me usando la cookie (si existe).
   */
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // LLAMADA REAL: Pedimos el perfil usando la cookie
        const userData = await getMyProfile();
        setUser(userData);
      } catch (error) {
        // Si hay error (401), no hay usuario
        setUser(null);
      } finally {
        // Pase lo que pase, terminamos de cargar
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []); // El array vacío [] asegura que solo se ejecute al montar

  /**
   * FUNCIÓN 2: Iniciar Sesión
   * Llama al endpoint de login (que pone la cookie)
   * y luego obtiene el perfil para actualizar el estado.
   */
  const handleLogin = async (data: LoginData) => {
    await login(data); // El backend pone la cookie
    const userData = await getMyProfile(); // Obtenemos los datos
    setUser(userData); // Actualizamos el estado global
  };

  /**
   * FUNCIÓN 3: Registrar
   * Llama al endpoint de registro.
   */
  const handleRegister = async (data: RegisterData) => {
    await register(data);
    // (No hacemos login aquí, el usuario deberá iniciar sesión)
  };

  /**
   * FUNCIÓN 4: Cerrar Sesión
   * Llama al endpoint de logout (que borra la cookie)
   * y limpia el estado global.
   */
  const handleLogout = async () => {
    await logout(); // El backend borra la cookie
    setUser(null); // Borramos al usuario del estado
  };

  // Prepara el valor que se pasará a los componentes hijos
  const value = {
    user,
    isLoading,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};