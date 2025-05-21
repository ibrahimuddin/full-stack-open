const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Test title 1",
        author: "Test author 1",
        url: "Test url 1",
        likes: 1,
    },
    {
        title: "Test title 2",
        author: "Test author 2",
        url: "Test url 2",
        likes: 1,
    }
]

module.exports = {initialBlogs}