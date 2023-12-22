// import * as uuid from 'uuid'
const uuid = require('uuid')
// import * as path from 'path'
const path = require('path')

class FileService {
  saveFile(file) {
    try {
      const fileName = uuid.v4() + '.png'
      const filePath = path.resolve('static', fileName)
      file.mv(filePath)
      return fileName
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new FileService()
