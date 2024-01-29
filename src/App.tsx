import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import CreateAccount from './components/CreateAccount'

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
    </Routes>
  )
}

export default App
