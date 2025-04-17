
import React from 'react';

interface CheckboxOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="oneblaze-checkbox mr-3"
      />
      <label htmlFor={id} className="text-sm">{label}</label>
    </div>
  );
};

export default CheckboxOption;
