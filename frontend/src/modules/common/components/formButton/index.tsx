import { useFormStatus } from 'react-dom'
import Button from '../button'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function FormButton({
  type,
  content,
  positive = true,
}: ButtonProps & { positive: boolean; content: string }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type={type}
      content={content}
      positive={positive}
      pending={pending}
    />
  )
}

export default FormButton
