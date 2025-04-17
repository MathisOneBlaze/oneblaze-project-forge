
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
  };

  return (
    <div className={`font-bold tracking-tighter ${className}`}>
      <img 
        src="/lovable-uploads/e8aaa7e3-94a8-4a94-a1d9-91c89053d04c.png" 
        alt="OneShell" 
        className={`${sizeClasses[size]}`} 
      />
    </div>
  );
};

export default Logo;
