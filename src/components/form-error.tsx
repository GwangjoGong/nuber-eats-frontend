interface IProps {
  errorMessage: string
}

export const FormError: React.FC<IProps> = ({ errorMessage }) => (
  <span className='font-medium text-red-500'>{errorMessage}</span>
)
