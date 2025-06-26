const bcrypt = require('bcryptjs')

const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
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
            passwordHash
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }
    

    
})

module.exports = usersRouter