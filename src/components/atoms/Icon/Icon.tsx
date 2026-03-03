import React from 'react';
import { IconProps } from './Icon.types';

const Icon: React.FC<IconProps> = ({ name, className = 'w-5 h-5' }) => {
  return <span className={`inline-block ${className}`} aria-hidden="true">{name}</span>;
};

export default Icon;