const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  className = '',
  block = false,
  ...props
}) => {
  const cls = `btn btn-${variant} btn-${size} ${block ? 'btn-block' : ''} ${className}`.trim();
  return (
    <button type={type} className={cls} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
