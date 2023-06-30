import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { videoRouter } from './routes/video-router'

const app = express()
const port = process.env.port || 4001

const parserMiddleware = bodyParser({})

app.get('/', (req: Request, res: Response) => {
  res.send('Video-server')
})
app.use(parserMiddleware)

app.use('/hometask_01/api/videos', videoRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
