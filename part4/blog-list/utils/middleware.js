// const { request } = require("../app")
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const tokenExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }

    next()
}

const userExtractor = async (request, response, next) => {
    decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({error: "token invalid"})
    }
    
    const user = await User.findById(decodedToken.id)
    request.user = user
    // if (!user) {
    //     return response.status(400).json({error: 'userID missing or not valid'})
    // }
    // else {
    //     request.user = user
    // }

    next()
    
}

module.exports = { tokenExtractor, userExtractor }