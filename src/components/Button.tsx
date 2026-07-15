import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

const variantClasses = {
  primary: 'bg-accent text-white hover:bg-accent-dark border-none',
  secondary:
    'bg-bg-elevated text-text border border-border hover:bg-border border-solid',
}

export default function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded px-5 py-2.5 text-[15px] font-semibold transition-colors duration-200 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
