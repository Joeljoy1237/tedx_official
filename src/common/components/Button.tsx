import React from "react";

interface ButtonProps {
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  title: string;
  icon?: any;
}

export default function Button({
  disabled,
  className,
  onClick,
  title,
  icon,
}: ButtonProps) {
  return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {title}
      {icon}
    </button>
  );
}
