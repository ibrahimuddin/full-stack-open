const { test, describe, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const config = require('../utils/config')
const helper = require('./test_helper')

const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject1 = new Blog(helper.initialBlogs[0])
    await blogObject1.save()
    let blogObject2 = new Blog(helper.initialBlogs[1])
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

test('like property missing defaults to 0', async () => {
    const blogWithNoLikes = {
        title: "Test NOLIKES",
        author: "Test NOLIKES",
        url: "Test NOLIKES",
    }

    await api
        .post('/api/blogs')
        .send(blogWithNoLikes)
        .expect(201)
    
    const response = await api.get('/api/blogs')
    const likes = response.body.map(b => b.likes)

    assert.strictEqual(likes[response.body.length-1], 0)
})

test('title or URL missing from data', async () => {
    const blogWithNoTitle = {
        author: "Test NoTitle",
        url: "Test NoTitle",
    }

    await api
        .post('/api/blogs')
        .send(blogWithNoTitle)
        .expect(400)
    
    const blogWithNoURL = {
        title: "Test NOURL",
        author: "Test NOURL",
    }

    await api
        .post('/api/blogs')
        .send(blogWithNoURL)
        .expect(400)
})

test('delete first blog', async () => {
    const totalBlogsBeginning = await api.get('/api/blogs')
    const blogToDelete = totalBlogsBeginning.body[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const totalBlogsEnd = await api.get('/api/blogs')
    
    assert.strictEqual(totalBlogsEnd.body.length + 1, totalBlogsBeginning.body.length)
}) 

test('update like count', async () => {
    const newBlog = {
        title: "Test UpdateLike",
        author: "Test UpdateLike",
        url: "Test UpdateLike",
        likes:5
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    const response = await api.get('/api/blogs')
    const likesBeforeUpdate = response.body.map(b => b.likes)

    assert.strictEqual(likesBeforeUpdate[response.body.length - 1], 5)

    lastBlogId = (response.body[response.body.length - 1]).id

    await api
        .put(`/api/blogs/${lastBlogId}`)
        .send({ "likes": 10 })
        .expect(200)
    
    const responseAfter = await api.get('/api/blogs')
    const likesAfterUpdate = responseAfter.body.map(b => b.likes)

    assert.strictEqual(likesAfterUpdate[response.body.length-1],10)
} )