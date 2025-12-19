import React from 'react';
import { Eye, EyeOff, Lock, Mail, AlertCircle, Check } from 'lucide-react';

// --- Types ---
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

// --- Components ---

export const AuthInput: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon, 
  isPassword, 
  className = "", 
  ...props 
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputType = isPassword ? (showPassword ? "text" : "password") : props.type || "text";

  return (
    <div className={`w-full mb-4 ${className}`}>
      <label className="block text-right text-sm font-semibold text-gray-700 mb-1.5 px-1">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={inputType}
          className={`
            w-full px-4 py-3.5 pl-10 rounded-xl border text-right
            transition-all duration-200 outline-none
            text-gray-800 placeholder-gray-400 bg-gray-50
            ${error 
              ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-200' 
              : 'border-gray-200 focus:border-[#5CAAF8] focus:ring-4 focus:ring-blue-50/50'
            }
          `}
        />
        
        {/* Right Icon (like Mail) */}
        {/* In RTL layout, the input text is right aligned, but icons usually stay purely visual or contextual. 
            Design shows icons on the LEFT side (end of input visually in RTL? No, start).
            Let's follow standard input with icon: Icon on the 'start' (right in RTL) or 'end' (left in RTL).
            Looking at the design: 
            Email: Icon is on the LEFT.
            Password: Eye is on the LEFT. 
            So we use 'left-0' absolute positioning.
        */}
        
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        ) : icon ? (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {icon}
          </div>
        ) : null}

        {/* Error Icon */}
        {error && !isPassword && (
           <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
             <AlertCircle size={20} />
           </div>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1.5 mr-1 text-right flex items-center gap-1 justify-end">
          {error}
          <AlertCircle size={12} />
        </p>
      )}
    </div>
  );
};

export const AuthButton: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = true, 
  className = "",
  ...props 
}) => {
  const baseStyles = "py-3.5 px-6 rounded-full font-bold transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-[#5CAAF8] text-white shadow-lg shadow-blue-200 hover:bg-[#4a90e2]",
    outline: "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50",
    ghost: "bg-transparent text-[#5CAAF8] hover:bg-blue-50"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const SocialButton: React.FC<{ provider: 'google' | 'apple', onClick?: () => void }> = ({ provider, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 px-4 rounded-xl border border-gray-200 bg-white flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors"
    >
      <span className="font-semibold text-gray-600">
        المتابعة باستخدام {provider === 'google' ? 'Google' : 'Apple'}
      </span>
      {provider === 'google' ? (
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 4.81c1.6 0 3.04.55 4.19 1.64l3.15-3.15C17.45 1.45 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
            <path d="M17.05 19.14c-1.18 1.74-2.42 3.48-4.29 3.51-1.63.04-2.15-.97-4.04-.97-1.88 0-2.48.95-3.99 1.02-2.03.07-3.56-2.03-4.83-3.87-2.64-3.81-2.15-9.45 2.15-11.32 1.94-.85 3.37-.21 4.45-.21 1.06 0 2.53-.98 4.28-.84 1.47.11 2.85.74 3.73 1.98-3.23 1.92-2.7 6.6 1.06 8.09-.23.69-.5 1.38-1.52 2.61zM12.03 2.95c.87-1.07 1.46-2.55 1.29-4.04-1.26.05-2.78.84-3.69 1.9-.81.93-1.52 2.45-1.33 3.9 1.41.11 2.85-.71 3.73-1.76z"/>
        </svg>
      )}
    </button>
  );
};
