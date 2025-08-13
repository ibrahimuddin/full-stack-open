import { useState } from 'react'


const Blog = ({ blog, updateBlog }) => {
  const [visible ,setVisible] = useState(false)
  
  const hideWhenVisible = {display : visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
    
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikeCount = () => {
    const author = blog.author
    const title = blog.title
    const url = blog.url
    const likes = blog.likes + 1
    const user = blog.user
    console.log("user", user)
    updateBlog({author,title,url,likes,user}, blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      Title : {blog.title}
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>View</button>  
      </div>
      <div style={showWhenVisible}>
        author : {blog.author}
        <br></br>
        url : {blog.url}
        <br></br>
        <div style={showWhenVisible}>
          likes {blog.likes}
          <button onClick={updateLikeCount}>like</button>
          <br></br>
          Username : {blog.user?.[0]?.name}
        </div>
        <button onClick={toggleVisibility}>cancel</button>  
      </div>
    </div>
  )
}

export default Blog