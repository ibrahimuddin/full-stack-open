import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import Alert from 'react-bootstrap/Alert';


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setError('')
    } catch (exception) {
      setError("Wrong Credentials")
      console.log("wrong credentials")
      setTimeout(() => {
        setError('')
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
    setError('')
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    const createdBlog = await blogService.create({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')

    setBlogs(blogs.concat(createdBlog))
    setSuccess(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    setTimeout(() => {
      setSuccess('')
    },5000)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createBlogForm = () => (
    <form onSubmit={handleBlogCreation}>
      <h2>CREATE NEW BLOG</h2>
      <div>
        Title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        URL:
        <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

  const displayUserBlogs = () => (
    //incomplete
    <div>
      {user.name} is logged in
      <form onSubmit={handleLogout}>
        <button type="submit">logout</button>
      </form>
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      {error ? <p>{error}</p> : null}
      {success ? <p>{success}</p> : null}
      {user === null && loginForm()}
      {user !== null && displayUserBlogs()}
      {user !==null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
       {user !== null && createBlogForm()}

    </div>
  )
}
//asd

export default App