import {useState} from 'react'

const BlogCreationForm = ({
    createBlog
}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [likes, setLikes] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title,author,url,likes
        })
        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes('')
    }
    
    
    return (
        <form onSubmit={addBlog}>
        <h2>CREATE NEW BLOG</h2>
        <div>
            Title:
            <input
            type="text"
            value={title}
            name="title"
            onChange={event => setTitle(event.target.value)}
            />
        </div>
        <div>
            Author:
            <input
            type="text"
            value={author}
            name="author"
            onChange={event => setAuthor(event.target.value)}
            />
        </div>
        <div>
            URL:
            <input
            type="text"
            value={url}
            name="URL"
            onChange={event => setUrl(event.target.value)}
            />
        </div>
        <div>
            likes:
            <input
            type="text"
            value={likes}
            name="likes"
            onChange={event => setLikes(event.target.value)}
            />
        </div>
        <button type="submit">create</button>
        </form>
        )
}

export default BlogCreationForm