const bcrypt = require('bcryptjs')

const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', { title: 1, author:1, url:1,likes:1})
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, password, name } = request.body

    if (username.length < 3) {
        response.status(400).json("Username length must be atleast 3 characters")
    }
    else if (password.length < 3) {
        response.status(400).json("Password length must be atleast 3 characters")
    }
    else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        
        const user = new User({
            username,
            name,
            password:passwordHash
        })

        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }
})

module.exports = usersRouter