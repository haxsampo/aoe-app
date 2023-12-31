const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../schemas/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({username})
  const corrPass = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && corrPass)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, 
    process.env.SEKRET,
    {expiresIn: 60*60})

  res.status(200).send({
    token,
    username:user.username,
    favciv: user.favciv
  })
})

module.exports = loginRouter