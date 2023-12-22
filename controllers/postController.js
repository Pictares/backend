// import PostService from '../Services/PostService.js'
const PostService = require('../Services/PostService.js')

class PostController {
  async create(req, res) {
    try {
      const { title, body } = req.body
      const post = {
        title,
        body,
      }
      const newPost = await PostService.create(post, req.files.image)
      // const newPost = await PostService.create(post)

      res.json({ status: 1, newPost })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 0, message: 'Create post error', error })
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostService.getAll()
      res.json({ status: 1, posts })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 0, message: 'Get posts error', error })
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res
          .status(400)
          .json({ status: 0, message: 'Post id is not specified' })
      }
      const post = await PostService.getOne(id)
      res.json({ status: 1, post })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 0, message: 'Get post error', error })
    }
  }

  async update(req, res) {
    try {
      const { id, title, body } = req.body
      if (!id) {
        return res
          .status(400)
          .json({ status: 0, message: 'Post id is not specified' })
      }
      const result = await PostService.update({ id, title, body })
      res.json({ status: 1, message: 'Post was updated' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 0, message: 'Update post error', error })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res
          .status(400)
          .json({ status: 0, message: 'Post id is not specified' })
      }
      const result = await PostService.delete(id)
      res.json({ status: 1, message: 'Post was deleted' })
    } catch (error) {
      console.log(error)
      res.status(500).json({ status: 0, message: 'Delete post error', error })
    }
  }
}

module.exports = new PostController()
