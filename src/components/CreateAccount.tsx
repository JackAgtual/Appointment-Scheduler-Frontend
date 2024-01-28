import { useState, useRef } from 'react'
import { ApiService } from '../services/apiService'
import NavigateLink from './NavigateLink'

function CreateAccount() {
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: '',
    password: '',
  })

  const emailRef = useRef<null | HTMLInputElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    emailRef.current?.setCustomValidity('')

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (emailRef.current === null) return

    try {
      const res = await ApiService.createAccount(formData)
      if (res.status === 201) {
        console.log('Account created')
      }
    } catch (error: any) {
      const validationMessage =
        error.response?.data?.message !== undefined
          ? error.response.data.message
          : 'Something went wrong'

      emailRef.current.setCustomValidity(validationMessage)
      emailRef.current.reportValidity()
    }
  }

  return (
    <div className="border-2 rounded-sm px-3 py-4 mx-4">
      <h1>Create account</h1>
      <form className="flex flex-col space-y-2 py-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email">Order number</label>
          <input
            onChange={handleChange}
            required={true}
            className="border-2 rounded-sm px-2"
            id="orderNumber"
            name="orderNumber"
            type="text"
            placeholder="ABC123"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            ref={emailRef}
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
          Create account
        </button>
      </form>
      <p className="text-center">
        <span>Already have an account? </span>
        <NavigateLink navigateTo="/">Sign in</NavigateLink>.
      </p>
    </div>
  )
}

export default CreateAccount
