import React from 'react'
import styles from './input.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

function Input({ type, name, required, value, readOnly = false }: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        value={value}
        readOnly={readOnly}
        className={styles.input}
      />
      <label htmlFor={name} className={styles.label}>
        {name}
        {required && <span className={styles.required}>*</span>}
      </label>
    </div>
  )
}

export default Input
