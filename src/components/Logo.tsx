
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  };

  return (
    <div className={`font-bold tracking-tighter ${sizeClasses[size]} ${className}`}>
      <span className="text-oneblaze-text">One</span>
      <span className="text-oneblaze-green-hover">Blaze</span>
    </div>
  );
};

export default Logo;
