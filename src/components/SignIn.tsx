import { useRef, useState } from 'react'
import { ApiService } from '../services/apiService'
import NavigateLink from './NavigateLink'

type SignInProps = {
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setPassword: React.Dispatch<React.SetStateAction<string>>
}

function SignIn({ setEmail, setPassword }: SignInProps) {
  const emailRef = useRef<null | HTMLInputElement>(null)
  const passwordRef = useRef<null | HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    emailRef.current?.setCustomValidity('')
    passwordRef.current?.setCustomValidity('')

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (emailRef.current === null || passwordRef.current === null) return

    const { email, password } = formData

    try {
      const res = await ApiService.signIn({ email, password })
      if (res.status === 200) {
        setEmail(email)
        setPassword(password)
      }
    } catch (error: any) {
      const validityMessage =
        error.response?.data?.message !== undefined
          ? error.response.data.message
          : 'Something went wrong'

      const invalidElement =
        error.response?.data?.invalidInput === 'email'
          ? emailRef.current
          : passwordRef.current

      invalidElement.setCustomValidity(validityMessage)
      invalidElement.reportValidity()

      setEmail('')
      setPassword('')
    }
  }
  return (
    <div className="border-2 rounded-sm px-3 py-4 mx-4">
      <h1>Sign in</h1>
      <form className="flex flex-col space-y-2 py-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            ref={emailRef}
            onChange={handleChange}
            required={true}
            className="border-2 rounded-sm px-2"
            id="email"
            name="email"
            type="email"
            placeholder="youremail@gmail.com"
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            onChange={handleChange}
            required={true}
            className="border-2 rounded-sm px-2"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <button className="bg-blue-400" type="submit">
          Sign in
        </button>
      </form>
      <p className="text-center">
        <span>Don't have an account? </span>
        <NavigateLink navigateTo="/create-account">Create an account</NavigateLink>.
      </p>
    </div>
  )
}

export default SignIn
