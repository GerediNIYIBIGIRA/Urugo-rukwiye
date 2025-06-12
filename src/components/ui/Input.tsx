import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-primary-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary-400">
            {icon}
          </div>
        )}
        <input
          className={`input-field ${icon ? 'pl-10' : ''} ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-error-400 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Input;