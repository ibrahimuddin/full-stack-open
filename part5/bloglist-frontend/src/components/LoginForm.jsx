import {useState} from 'react'

const LoginForm = ({
    handleLogin,
}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

  const addLogin = (event) => {
    event.preventDefault()
    handleLogin({
      username,password
    })
    setUsername('')
    setPassword('')
  }

    return(
    <form onSubmit={addLogin}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">login</button>
        </form>
    )
}

export default LoginForm