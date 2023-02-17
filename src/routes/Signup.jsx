import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

export default function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log({username}, {password})

    await signup(username, password)
  }

  return (
    <form className='signup' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label htmlFor='username'>Username: </label>
      <input 
        type="type"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor='password'>Password: </label>
      <input 
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )

}
