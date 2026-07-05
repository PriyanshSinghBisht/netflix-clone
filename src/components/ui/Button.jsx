import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-hover active:bg-primary-hover shadow-sm',
  secondary:
    'bg-surface-alt text-text-primary hover:bg-surface-hover active:bg-surface active:border-border-hover border border-border',
  ghost:
    'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface-alt',
  outline:
    'bg-transparent text-text-primary border border-border hover:border-border-hover hover:bg-surface-alt',
};

const sizes = {
  sm: 'px-3 py-1.5 text-xs rounded-md',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-6 py-2.5 text-base rounded-lg',
  xl: 'px-8 py-3 text-base rounded-lg',
};

const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  iconLeft,
  iconRight,
  fullWidth,
  loading,
  disabled,
  ...props
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.15 }}
      className={`
        inline-flex items-center justify-center gap-2 font-medium
        transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-primary/40
        ${variants[variant] || variants.primary}
        ${sizes[size] || sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && iconLeft && <span className="shrink-0">{iconLeft}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </motion.button>
  );
};

export default Button;
