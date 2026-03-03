import { ChangeEvent } from 'react';

export interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'url';
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  name?: string;
  id?: string;
}
