
import React from 'react';
import { cn } from '@/lib/utils';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, children, className }) => {
  return (
    <div className={cn("mb-4", className)}>
      <label className="block text-sm font-medium mb-2">{label}</label>
      {children}
    </div>
  );
};

export default FormField;
