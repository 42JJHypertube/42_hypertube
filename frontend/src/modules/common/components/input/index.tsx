import React from 'react'
import styles from './input.module.scss'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

function Input({ type, name, required }: InputProps) {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        className={styles.input}
      />
      <label htmlFor={name} className={styles.label}>
        {name}
        <span className={styles.required}>*</span>
      </label>
    </div>
  )
}

export default Input
