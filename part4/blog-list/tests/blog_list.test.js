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