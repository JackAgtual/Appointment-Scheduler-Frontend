import { useNavigate } from 'react-router-dom'

type NavigateLinkProps = {
  navigateTo: string
  children: React.ReactNode
}
function NavigateLink({ navigateTo, children }: NavigateLinkProps) {
  const navigate = useNavigate()
  return (
    <span
      className="underline text-blue-400 cursor-pointer"
      onClick={() => navigate(navigateTo)}
    >
      {children}
    </span>
  )
}

export default NavigateLink
