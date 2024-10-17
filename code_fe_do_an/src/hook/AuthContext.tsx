import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, Navigate, Outlet } from 'react-router-dom';
import * as jwt_decode from 'jwt-decode'; // Sử dụng `import * as` để lấy toàn bộ module



// Define User interface based on your Sequelize User model
interface User {
  user_id: number;
  username: string;
  role: 'teacher' | 'admin' | 'support';
  email: string;
  full_name: string;
  token: string; // JWT Token
}

// Define context type
type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  handleLogin: (userData: User) => void;
  handleLogout: () => void;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user); // Track authentication state
  const navigate = useNavigate();

  // Handle login and save user in localStorage
  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('userData', JSON.stringify(userData));
    redirectToRolePage(userData.role); // Navigate to appropriate page
  };

  // Handle logout, remove user from localStorage, and redirect to login
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    navigate('/');
  };

  // Automatically navigate user based on role
  const redirectToRolePage = (role: User['role']) => {
    console.log(role);
    if (role === 'admin') {
      navigate('/admin/');
    } else if (role === 'teacher') {
      navigate('/teacher/computer-rooms-management/manage');
    } else if (role === 'support') {
      navigate('/support-dashboard');
    } else {
      navigate('/'); // Default home page
    }
  };

  // Effect to validate user token and handle page refresh
  useEffect(() => {
    if (user) {
      try {
        const decodedToken: any = jwt_decode(user.token);
        const currentTime = Date.now() / 1000;

        // If token is expired, log out the user
        if (decodedToken.exp < currentTime) {
          handleLogout();
        }
      } catch (error) {
        console.error("Invalid token or error decoding JWT:", error);
        handleLogout(); // Log out in case of invalid token
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// ProtectedRoute Component
export const ProtectedRoute: React.FC<{ children: React.ReactNode, requiredRole?: User['role'] }> = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Check for required role
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

// PublicRoute Component (for routes like login, register)
export const PublicRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // If the user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
