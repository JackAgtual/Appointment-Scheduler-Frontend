import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import CreateAccount from './components/CreateAccount'
import Dashboard from './components/Dashboard'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <Routes>
      <Route
        path="/"
        element={<SignIn setEmail={setEmail} setPassword={setPassword} />}
      />
      <Route
        path="/create-account"
        element={<CreateAccount setEmail={setEmail} setPassword={setPassword} />}
      />
      <Route
        path="/dashboard"
        element={<Dashboard email={email} password={password} />}
      />
    </Routes>
  )
}

export default App
