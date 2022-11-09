const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModels')

// @desc Register a new user
// @routes /api/users
// @access public

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //check Validation
    if (!email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    //check if user already exists
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        email,
        password: hashPassword
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user Details')
    }

})

// @desc Login user
// @routes /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //validation
    if (!email || !password) {
        res.status(400)
        throw new Error('Please complete all fields')
    }

    //get one user
    const user = await User.findOne({ email })

    //get if user matches the one in database
    if (user && (await bcrypt.compare(password, user.password))) {
        if (user) {
            res.status(200).json({
                _id: user._id,
                email: user.email,
            })
        }

    }
    else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})


const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
    registerUser,
    loginUser,
}