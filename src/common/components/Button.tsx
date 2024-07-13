import React from 'react';

interface ButtonProps {
  className?: string;
  title: string;
}

export default function Button({ className, title }: ButtonProps) {
  return (
    <button className={className}>
      {title}
    </button>
  );
}
