import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogCreationForm from './components/BlogCreationForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [visible, setVisible] = useState(true)

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

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
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

  const createBlog = async (blogObject) => {
    const createdBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat(createdBlog))
    setSuccess(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    setTimeout(() => {
      setSuccess('')
    },5000)
  }

  const updateBlog = async (blogObject,blogId) => {
    const updatedBlog = await blogService.update(blogObject, blogId)
    console.log(updatedBlog)
    setBlogs(prevBlogs =>
          prevBlogs.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
    );

    // {blogs.map(blog => console.log(blog))}
    
    setSuccess(`the blog ${updatedBlog.title} has been updated`)
    setTimeout(() => {
      setSuccess('')
    },5000)
  }

  const loginForm = () => (
    <Togglable buttonLabel="Login">
        <LoginForm
          handleLogin={handleLogin}
        />
    </Togglable>
  )

  const createBlogForm = () => (
    <Togglable buttonLabel="New Blog">
      <BlogCreationForm
        createBlog={createBlog}
      />
      </Togglable>
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
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )}
       {user !== null && createBlogForm()}

    </div>
  )
}

export default App