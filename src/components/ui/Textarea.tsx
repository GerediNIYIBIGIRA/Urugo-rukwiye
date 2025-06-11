import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-neutral-700">
          {label}
        </label>
      )}
      <textarea
        className={`input-field resize-none ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-100' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-sm text-error-600 font-medium">{error}</p>
      )}
    </div>
  );
};

export default Textarea;