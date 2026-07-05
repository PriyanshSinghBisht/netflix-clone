import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const Select = ({
  label,
  value,
  options = [],
  onChange,
  icon,
  placeholder,
  error,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selected = options.find((o) => o.value === value);
  const hasSelection = selected && value !== '' && value !== undefined;

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-2 w-full rounded-lg border transition-all duration-fast
          ${error
            ? 'border-red-500'
            : isOpen
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-border hover:border-border-hover'
          }
          bg-surface-alt text-text-primary px-3 py-2.5 text-sm
          focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
        `}
      >
        {icon && (
          <span className={`shrink-0 transition-colors duration-fast ${isOpen ? 'text-primary' : 'text-text-muted'}`}>
            {icon}
          </span>
        )}
        <span className={`flex-1 text-left truncate ${hasSelection ? 'text-text-primary' : 'text-text-muted'}`}>
          {hasSelection ? selected.label : placeholder || label || 'Select...'}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-text-muted"
        >
          <FiChevronDown className="w-4 h-4" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 right-0 mt-1.5 z-50 overflow-hidden rounded-lg border border-border bg-surface shadow-xl shadow-black/40"
          >
            <div className="py-1 max-h-56 overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left px-3 py-2 text-sm transition-colors duration-fast
                    ${value === option.value
                      ? 'bg-primary-muted text-primary font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="mt-1 text-xs text-red-500 px-1">{error}</p>}
    </div>
  );
};

export default Select;
