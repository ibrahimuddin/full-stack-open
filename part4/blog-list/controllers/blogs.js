const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  // const user = await User.findById(body.userId)
  const users = await User.find({})
  const user = users[0]


  if (!user) {
    return response.status(400).json({error: 'userID missing or not valid'})
  }
  
  if (body['title'] === undefined) {
    response.status(400).json()
  } else if (body['url'] === undefined) {
    response.status(400).json()
  }
  else {
    const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
    })

    const newBlog = await blog.save()

    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    response.status(201).json(newBlog)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const {title,author,url,likes} = request.body

  myBlog = await Blog.findById(request.params.id)

  if (!myBlog) {
    return response.status(404).end()
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {title, author, url, likes}, {new:true})
    response.send(updatedBlog)
  }
  catch(exception) {
    next(exception)
  }
})


module.exports = blogsRouter