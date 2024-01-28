import { Routes, Route } from 'react-router-dom'
import SignIn from './components/SignIn'
import CreateAccount from './components/CreateAccount'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/create-account" element={<CreateAccount />} />
    </Routes>
  )
}

export default App
