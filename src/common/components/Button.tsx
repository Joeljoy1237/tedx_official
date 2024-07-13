import React from 'react';

interface ButtonProps {
  className?: string;
  title: string;
  icon?:any
}

export default function Button({ className, title,icon }: ButtonProps) {
  return (
    <button className={className}>
      {title}
      {icon}
    </button>
  );
}
