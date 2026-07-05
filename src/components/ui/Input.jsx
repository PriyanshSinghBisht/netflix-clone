import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Input = ({
  label,
  value,
  onChange,
  type = 'text',
  icon,
  error,
  hint,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || '');
  const inputRef = useRef(null);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const hasValue = currentValue !== '' && currentValue !== null && currentValue !== undefined;
  const isFloating = focused || hasValue;

  useEffect(() => {
    if (!isControlled && value !== undefined) {
      setInternalValue(value);
    }
  }, [value, isControlled]);

  const handleChange = (e) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div className={`relative ${containerClassName}`}>
      <div
        className={`
          relative flex items-center rounded-lg border transition-all duration-fast
          ${error
            ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
            : focused
              ? 'border-primary focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20'
              : 'border-border hover:border-border-hover'
          }
          bg-surface-alt
          ${className}
        `}
        onClick={() => inputRef.current?.focus()}
      >
        {icon && (
          <span className={`pl-3 shrink-0 transition-colors duration-fast ${focused ? 'text-primary' : 'text-text-muted'}`}>
            {icon}
          </span>
        )}
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type={type}
            value={currentValue}
            onChange={handleChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent text-text-primary outline-none border-none py-2.5 px-3 text-sm peer"
            {...props}
          />
          {label && (
            <motion.label
              animate={{
                top: isFloating ? '4px' : '50%',
                fontSize: isFloating ? '11px' : '14px',
                color: isFloating
                  ? error
                    ? '#ef4444'
                    : focused
                      ? '#E50914'
                      : '#6b6b6b'
                  : '#6b6b6b',
              }}
              initial={false}
              transition={{ duration: 0.15 }}
              className="absolute left-3 pointer-events-none -translate-y-1/2 origin-left"
              style={{ top: isFloating ? '4px' : '50%' }}
            >
              {label}
            </motion.label>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-500 px-1">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-text-muted px-1">{hint}</p>}
    </div>
  );
};

export default Input;
