
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxOptionProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxOption: React.FC<CheckboxOptionProps> = ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center space-x-3 my-2">
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
      />
      <Label htmlFor={id} className="text-sm">{label}</Label>
    </div>
  );
};

export default CheckboxOption;
