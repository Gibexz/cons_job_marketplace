import React, { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react';

// --- THEME CONSTANTS ---
// Adjust specific shades here to match your exact branding
const theme = {
  primary: 'bg-orange-600 hover:bg-orange-700 text-white',
  secondary: 'bg-gray-800 hover:bg-gray-900 text-white',
  outline: 'border-2 border-gray-200 text-gray-700 hover:border-orange-500 hover:text-orange-600',
  inputFocus: 'focus:ring-2 focus:ring-orange-500 focus:border-orange-500',
};

// 1. LAYOUT WRAPPER
// Centers content and handles the grey background
export const AuthLayout = ({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) => (
  <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      {/* Placeholder for Logo */}
    <div className="flex flex-col items-center gap-2">
    <div className="h-14 w-14 bg-orange-600 rounded-lg flex items-center justify-center shadow-md">
        <span className="text-white font-black text-2xl tracking-tight">CJ</span>
    </div>
    <h1 className="text-gray-900 font-extrabold text-xl tracking-wide uppercase text-center">
        Construction Job <span className="text-orange-600">MarketPlace</span>
    </h1>
    </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-center text-sm text-gray-600">
          {subtitle}
        </p>
      )}
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border-t-4 border-orange-600">
        {children}
      </div>
    </div>
  </div>
);

// 2. INPUT COMPONENT
// Handles labels, styling, and standard HTML input props
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export const InputField = ({ label, id, className = '', ...props }: InputProps) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <div className="mt-1">
      <input
        id={id}
            className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 font-medium sm:text-sm outline-none transition-colors ${theme.inputFocus} ${className}`}
        {...props}
      />
    </div>
  </div>
);

// 3. BUTTON COMPONENT
// Handles loading states and variants (primary/secondary)
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export const Button = ({ children, variant = 'primary', isLoading, className = '', ...props }: ButtonProps) => {
  const baseStyle = "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors";
  const variantStyle = variant === 'primary' ? theme.primary : variant === 'secondary' ? theme.secondary : theme.outline;

  return (
    <button
      className={`${baseStyle} ${variantStyle} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing...
        </span>
      ) : children}
    </button>
  );
};

// 4. ERROR ALERT
export const ErrorMessage = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="rounded-md bg-red-50 p-4 mb-4 border-l-4 border-red-500">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};