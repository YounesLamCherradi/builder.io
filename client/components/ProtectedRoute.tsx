import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      const token = sessionStorage.getItem('adminToken');

      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const response = await fetch('/api/auth/validate', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        setIsValid(result.valid === true);

        // If token is invalid, clear it
        if (!result.valid) {
          sessionStorage.removeItem('adminToken');
          sessionStorage.removeItem('adminUsername');
        }
      } catch (error) {
        console.error('Token validation error:', error);
        setIsValid(false);
        sessionStorage.removeItem('adminToken');
        sessionStorage.removeItem('adminUsername');
      }
    };

    validateToken();
  }, []);

  if (isValid === null) {
    // Still validating
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/admin-login" replace />;
  }

  return <>{children}</>;
}
