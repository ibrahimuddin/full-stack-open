import { useState } from 'react'


const Blog = ({ blog }) => {
  const [visible ,setVisible] = useState(false)
  
  const hideWhenVisible = {display : visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
    
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikeCount = () => {
    // not implemented
    setLikeCount(likeCount + 1)
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
        </div>
        <button onClick={toggleVisibility}>cancel</button>  
      </div>
    </div>
  )
}

export default Blog