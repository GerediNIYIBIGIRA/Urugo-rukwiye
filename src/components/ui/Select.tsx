import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  options,
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
      <select
        className={`input-field ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : ''} ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-dark-800 text-white">
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-error-400 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Select;