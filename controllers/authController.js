import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config.js'
import AuthService from '../Services/AuthService.js'

const generateAccessToken = (id, role) => {
  const payload = {
    id,
    role,
  }

  return jwt.sign(payload, config.secret, { expiresIn: '24h' })
}

class AuthController {
  async registration(req, res) {
    try {
      const { username, password } = req.body
      if (username.length < 4 || username.length > 10) {
        return res.status(400).json({
          message: 'Username must be between 4 and 10 characters',
        })
      }

      if (password.length < 4 || password.length > 10) {
        return res.status(400).json({
          message: 'Password must be between 4 and 10 characters',
        })
      }

      const result = await AuthService.registration(username, password)
      if (result.affectedRows == 0) {
        return res.status(400).json({ message: 'User already exists' })
      }
      res.json({ message: 'User was created' })
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: 'Registration error', error })
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const result = await AuthService.login(username)
      if (!result.length) {
        return res.status(400).json({ status: 0, message: 'Invalid username' })
      }
      const user = result[0]
      const validPassword = bcrypt.compareSync(password, user.password)
      if (!validPassword) {
        return res.status(400).json({ status: 0, message: 'Invalid password' })
      }
      const token = generateAccessToken(user.id, user.role)
      res.json({ status: 1, username: user.username, role: user.role, token })
    } catch (error) {
      console.log(error)
      res.status(400).json({ status: 0, message: 'Login error', error })
    }
  }
}

export default new AuthController()
