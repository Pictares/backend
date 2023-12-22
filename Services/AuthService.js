// import bcrypt from 'bcryptjs'
const bcrypt = require('bcryptjs')
// import mysql from 'mysql'
const mysql = require('mysql')

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'admin',
  database: 'node_data_base',
})

const connectDB = async (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, function (err, result, fields) {
      if (err) reject(err)
      resolve(result)
    })
  })
}

// временно не используется
// const processRawData = (rawData) => {
//   const items = []
//   rawData.forEach((element) => {
//     const item = {}
//     Object.keys(element).forEach((key) => {
//       item[key] = element[key]
//     })
//     items.push(item)
//   })
//   return items
// }

class AuthService {
  async registration(username, password) {
    const hashePassword = bcrypt.hashSync(password, 7)
    const query = `INSERT IGNORE users (username, password, role, reg_date) VALUES ('${username}', '${hashePassword}', 'user', now())`
    const result = await connectDB(query)
    return result
  }

  async login(username) {
    const query = `SELECT * FROM users WHERE username='${username}'`
    const result = await connectDB(query)
    return result
  }
}

module.exports = new AuthService()
