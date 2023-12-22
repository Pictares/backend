import express from 'express'
import postRouter from './routers/postRouter.js'
import authRouter from './routers/authRouter.js'
import fileUpload from 'express-fileupload'
import path from 'path'

const __dirname = path.resolve()
const PORT = process.env.PORT | 5000

const app = express()

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})
app.use(express.static('static'))
app.use(fileUpload({}))

app.use('/api', authRouter)
app.use('/api', postRouter)

// ----------------------API для загрузки файлов-----------------
app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: 'file is not found' })
  }
  const myFile = req.files.file

  // метод mv() помещает файл в папку public
  myFile.mv(`${__dirname}/static/${myFile.name}`, function (err) {
    if (err) {
      console.log(err)
      return res.status(500).send({ msg: 'Error occurred' })
    }
    // возвращаем ответ с именем файла и его расположением
    return res.send({ name: myFile.name, path: `/${myFile.name}` })
  })
})
// -------------------------------------------------------------------

app.listen(PORT, () => {
  console.log('Server was started on PORT: ', PORT)
})
