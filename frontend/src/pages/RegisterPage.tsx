// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../types'; // Importamos el OBJETO
import type { UserRole as UserRoleType } from '../types'; // Importamos el TIPO

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRoleType>(UserRole.FREELANCER); // Default
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register({ email, password, role });
      navigate('/login'); // Redirige a login después de registrarse
    } catch (err) {
      setError('Error al registrarse. Intenta con otro email.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Cuenta</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        
        {/* Inputs de Email y Password (igual que en Login)... */}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700">Quiero ser:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as UserRoleType)}
            className="w-full px-3 py-2 border rounded bg-white"
          >
            {/* Usamos el OBJETO 'UserRole' para los valores */}
            <option value={UserRole.FREELANCER}>Freelancer</option>
            <option value={UserRole.CLIENT}>Cliente</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Registrarse
        </button>
      </form>
    </div>
  );
}