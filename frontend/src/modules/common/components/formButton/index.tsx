import { useFormStatus } from 'react-dom'
import Button from '../button'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

function FormButton({
  type,
  content,
  positive = true,
  isPending,
}: ButtonProps & { positive: boolean; content: string; isPending?: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type={type}
      content={content}
      positive={positive}
      pending={pending || isPending ? true : false}
    />
  )
}

export default FormButton
