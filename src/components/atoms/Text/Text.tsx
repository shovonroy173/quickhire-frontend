import React from 'react';
import { TextProps } from './Text.types';

const Text: React.FC<TextProps> = ({ children, className = '', as = 'p' }) => {
  const Component = as as React.ElementType;
  return <Component className={className}>{children}</Component>;
};

export default Text;
