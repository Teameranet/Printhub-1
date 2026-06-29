import { useState } from 'react';
import './Button.css';

const Button = ({ children, variant = 'primary', size = 'md', onClick, type = 'button', className = '', ...props }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
