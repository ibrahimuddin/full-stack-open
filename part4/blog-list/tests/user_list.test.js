const { test, describe, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const config = require('../utils/config')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    let userObject1 = new User(helper.initialUsers[0])
    await userObject1.save()
    let userObject2 = new User(helper.initialUsers[1])
    await userObject2.save()
})

test('user list initially is 2', async () => {
    const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(response.body.length,2)
})
 
test('user created successfully', async () => {
    const correctUser = {
        username: "correct user",
        password: "correct passsword",
        name: "correct name"
    }

    const response = await api
        .post('/api/users')
        .send(correctUser)
        .expect(201)
    
    const responseAfterCreation = await api
        .get('/api/users')
        .expect(200)
    
    assert.strictEqual(responseAfterCreation.body.length,3)
})

test('invalid users are not created', async () => {
    const shortUsername =  {
        username: "sh",
        password: "123456",
        name: "name"
    }

    const response_1 = await api
        .post('/api/users')
        .send(shortUsername)
        .expect(400)


    const shortPassword = {
        username: "username",
        password: "sh",
        name: "name"
    }

    const response_2 = await api
        .post('/api/users')
        .send(shortPassword)
        .expect(400)
})
