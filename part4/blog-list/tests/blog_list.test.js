const { test, describe, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const config = require('../utils/config')

const api = supertest(app)

const initalBlogs = [
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

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject1 = new Blog(initalBlogs[0])
    await blogObject1.save()
    let blogObject2 = new Blog(initalBlogs[1])
    await blogObject2.save()
})


test('blogs of list is 2', async () => {
    console.log('Connecting to:', config.MONGODB_URI)
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length,2)
})

test('id property is id and not _id', async () => {
    const response = await api.get('/api/blogs')

    for (const blog of response.body) {
        assert.strictEqual(typeof blog.id, 'string')
        assert.strictEqual(typeof blog._id, 'undefined')
    }
})

test('create a new blog', async () => {
    const newBlog = {
        title: "Test POST",
        author: "Test POST Author",
        url: "Test POST URL",
        likes: 1,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, 3)
    const titles = response.body.map(b => b.title )
    assert.strictEqual(titles.includes('Test POST'), true)
    const authors = response.body.map(b => b.author )
    assert.strictEqual(authors.includes('Test POST Author'), true)
    const urls = response.body.map(b => b.url )
    assert.strictEqual(urls.includes('Test POST URL'), true)    
})