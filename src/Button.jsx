import clsx from 'clsx'

/**
 * Button component
 * @param {React.ButtonHTMLAttributes &
 * {isLoading: Boolean, size: 's' | 'm'}
 * } props
 */
export default function Button({
  className = '',
  children,
  isLoading = false,
  type = 'button',
  size = 'm',
  ...props
}) {
  const buttonClasses = clsx(
    {
      'px-2 py-1 text-sm': size === 's',
      'px-3 py-2 text-base': size === 'm',
    },
    'border-[1px] border-slate-500',
    'text-slate-700 outline-2 outline-violet-600 shadow-inner shadow-slate-200',
    'transition-colors duration-150',
    'hover:bg-slate-500 hover:text-white',
    className
  )

  return (
    <button
      className={buttonClasses}
      type={type}
      {...props}
      aria-busy={isLoading}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  )
}
