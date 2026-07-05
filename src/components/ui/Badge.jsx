const variants = {
  default: 'bg-surface-alt text-text-secondary border border-border',
  primary: 'bg-primary-muted text-primary border border-primary/30',
  success: 'bg-green-500/10 text-green-400 border border-green-500/30',
  warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30',
  info: 'bg-blue-500/10 text-blue-400 border border-blue-500/30',
};

const sizes = {
  sm: 'px-1.5 py-0.5 text-2xs',
  md: 'px-2 py-0.5 text-xs',
  lg: 'px-2.5 py-1 text-sm',
};

const Badge = ({
  variant = 'default',
  size = 'md',
  className = '',
  children,
}) => {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-md
        ${variants[variant] || variants.default}
        ${sizes[size] || sizes.md}
        ${className}
      `}
    >
      {children}
    </span>
  );
};

export default Badge;
