import clsx from 'clsx'

/**
 * Button component
 * @param {React.ButtonHTMLAttributes & {isLoading: Boolean}} props
 */
export default function Button({
  className = '',
  children,
  isLoading = false,
  type = 'button',
  ...props
}) {
  const buttonClasses = clsx(
    'px-3 py-2 border-[1px] border-slate-500 text-slate-700 outline-2 outline-violet-600',
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
