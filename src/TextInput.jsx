import clsx from 'clsx'
import { useField } from 'formik'
import PropTypes from 'prop-types'

/**
 * Input component
 * @param {import('react').InputHTMLAttributes & {label: String}} props Text input props
 */
export default function TextInput({
  label,
  id,
  required = false,
  className = '',
  ...props
}) {
  const [field, meta] = useField(props)
  const labelClasses = clsx('block', 'mb-1')
  const inputClasses = clsx(
    'block',
    'w-full',
    'border-[1px]',
    'p-1',
    'mb-1',
    'outline-2',
    'outline-violet-600',
    'placeholder:text-slate-600',
    'p-2',
    'bg-transparent',
    'border-slate-500'
  )

  return (
    <div className={className}>
      <label
        className={labelClasses}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        {...field}
        {...props}
        id={id}
        className={inputClasses}
        aria-required={required}
        aria-describedby={`description-${id}`}
      />
      {meta.touched && meta.error ? (
        <div
          className="text-orange-700 first-letter:capitalize text-sm"
          id={`description-${id}`}
          aria-live="assertive"
        >
          {meta.error}
        </div>
      ) : null}
    </div>
  )
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string,
  required: PropTypes.bool,
}
