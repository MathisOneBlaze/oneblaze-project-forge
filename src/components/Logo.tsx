
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
        src="/lovable-uploads/f922661b-bf08-44a6-ac07-10e9c71a2d51.png" 
        alt="OneShell" 
        className={`${sizeClasses[size]}`} 
      />
    </div>
  );
};

export default Logo;
