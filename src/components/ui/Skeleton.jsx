const Skeleton = ({
  className = '',
  variant = 'text',
  width,
  height,
}) => {
  const variants = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rect: 'rounded-lg',
    card: 'rounded-xl',
  };

  return (
    <div
      className={`
        animate-skeleton bg-surface-alt
        ${variants[variant] || variants.text}
        ${className}
      `}
      style={{
        width: width || undefined,
        height: height || undefined,
      }}
    />
  );
};

export default Skeleton;
