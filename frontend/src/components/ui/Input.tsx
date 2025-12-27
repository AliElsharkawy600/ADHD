import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  error, 
  icon, 
  isPassword, 
  className = "", 
  ...props 
}) => {
  const [showPassword, setShowPassword] = useState(false);
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
            ${icon
              //  إزالة  pl-10 عند إزالة الايقونة
              ?'w-full px-4 py-3.5 pl-10 rounded-xl border text-right transition-all duration-200 outline-none text-gray-800 placeholder-gray-400 bg-gray-50'
              :'w-full px-4 py-3.5 rounded-xl border text-right transition-all duration-200 outline-none text-gray-800 placeholder-gray-400 bg-gray-50'
            }
            ${error 
              ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-200' 
              : 'border-gray-200 focus:border-[#5CAAF8] focus:ring-4 focus:ring-blue-50/50'
            }
          `}
        />
        
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
