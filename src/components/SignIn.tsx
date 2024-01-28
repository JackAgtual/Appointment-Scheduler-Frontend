import { useRef } from 'react'
import { ApiService } from '../services/apiService'

function SignIn() {
  const formRef = useRef<null | HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = formRef.current
    if (form === null) return

    const email = form.email.value
    const password = form.password.value
    try {
      const res = await ApiService.signIn({ email, password })
      console.log(res.data)
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message)
      }
    }
  }
  return (
    <div className="border-2 rounded-sm px-3 py-4 mx-4">
      <h1>Sign in</h1>
      <form ref={formRef} className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="border-2 rounded-sm px-2"
            id="email"
            type="email"
            placeholder="youremail@gmail.com"
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="border-2 rounded-sm px-2"
            id="password"
            type="password"
            autoComplete="current-password"
          />
        </div>
        <button className="bg-blue-400" type="submit">
          Sign in
        </button>
      </form>
    </div>
  )
}

export default SignIn
