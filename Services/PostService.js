import mysql from 'mysql'
import fileService from './FileService.js'

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

const processRawData = (rawData) => {
  const items = []
  rawData.forEach((element) => {
    const item = {}
    Object.keys(element).forEach((key) => {
      item[key] = element[key]
    })
    items.push(item)
  })
  return items
}

// только логика работы с БД
class PostService {
  async create(post, image) {
    const fileName = fileService.saveFile(image)
    const query = `INSERT INTO posts (title, body, image) VALUES ('${post.title}', '${post.body}', '${fileName}')`
    const result = await connectDB(query)
    const newPost = {
      id: result.insertId,
      title: post.title,
      body: post.body,
      image: fileName,
    }
    return newPost
  }

  async getAll() {
    const query = 'SELECT * FROM posts'
    const result = await connectDB(query)
    const posts = processRawData(result)
    return posts
  }

  async getOne(postId) {
    if (!postId) {
      return res
        .status(400)
        .json({ status: 0, message: 'Post id is not specified' })
    }
    const query = `SELECT * FROM posts WHERE id='${postId}'`
    const result = await connectDB(query)
    const post = processRawData(result)
    return post
  }

  async update({ id, title, body }) {
    if (!id) {
      return res
        .status(400)
        .json({ status: 0, message: 'Post id is not specified' })
    }
    const query = `UPDATE posts SET title='${title}', body='${body}', updated_time=now() WHERE id='${id}'`
    const result = await connectDB(query)
  }

  async delete(postId) {
    if (!postId) {
      return res
        .status(400)
        .json({ status: 0, message: 'Post id is not specified' })
    }
    const query = `DELETE FROM posts WHERE id='${postId}'`
    const result = await connectDB(query)
  }
}

export default new PostService()
