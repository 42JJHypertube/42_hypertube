import styles from './index.module.scss'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function Button({
  type,
  content,
  positive = true,
  pending = false,
}: ButtonProps & { positive: boolean; content: string; pending: boolean }) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${styles.button} ${positive && !pending ? styles.positive : styles.negative}`}
    >
      {pending ? '...' : content}
    </button>
  )
}

export default Button
