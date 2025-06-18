const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
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
    likes: body.likes || 0
    })

    const newBlog = await blog.save()
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
  const updatedBlog = request.body
  
  Blog.findById(request.params.id)
    .then(blog => {
      if (!blog) {
        return response.status(404).end()
      }
      blog.likes = updatedBlog.likes

      return blog.save().then((b) => {
        response.json(b)
      })
    })
  .catch(error => next(error))
})


module.exports = blogsRouter