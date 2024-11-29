import React from 'react'
import styles from './input.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  innerButton?: React.ReactNode | null
  error?: boolean
}

function Input({
  type,
  name,
  required,
  value,
  readOnly = false,
  onChange = undefined,
  innerButton = null,
  error,
}: InputProps) {
  // 불필요한 공백을 제거하기위한 trim() 사용.
  const inputCss =
    `${styles.input} ${readOnly ? styles.readOnly : ''} ${error ? styles.error : styles.normal}`.trim()

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        readOnly={readOnly}
        className={inputCss}
        onChange={onChange}
        tabIndex={readOnly ? -1 : 0}
      />
      <label htmlFor={name} className={styles.label}>
        {name === 'password2' ? 'password confirm' : name}
        {required && <span className={styles.required}>*</span>}
      </label>
      {innerButton}
    </div>
  )
}

export default Input
