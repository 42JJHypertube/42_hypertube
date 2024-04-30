import React from 'react'
import styles from './input.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  innerButton?: React.ReactNode
}

function Input({
  type,
  name,
  required,
  value,
  readOnly = false,
  onChange = undefined,
  innerButton,
}: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        readOnly={readOnly}
        className={
          readOnly ? `${styles.input} ${styles.readOnly}` : styles.input
        }
        onChange={onChange}
        tabIndex={readOnly ? -1 : 0}
      />
      <label htmlFor={name} className={styles.label}>
        {name === 'password2' ? 'password confirm' : name}
        {required && <span className={styles.required}>*</span>}
      </label>
      {innerButton ? innerButton : null}
    </div>
  )
}

export default Input
