import React, { createContext, useContext, useState, useEffect } from 'react';

// تعريف شكل بيانات المستخدم
export interface UserProfile {
  name: string | null;
  gender: "male" | "female" | null;
}

interface AuthContextType {
  token: string | null;
  user: UserProfile | null; // إضافة المستخدم هنا
  isLoading: boolean;
  login: (token: string, userData: UserProfile) => void; // تحديث دالة التسجيل لتقبل بيانات المستخدم
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  isLoading: true,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // استرجاع التوكن وبيانات المستخدم عند بدء التطبيق
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('user_data');

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, userData: UserProfile) => {
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('user_data', JSON.stringify(userData)); // حفظ بيانات المستخدم
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoading, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);