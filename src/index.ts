import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import { videoRouter } from './routes/video-router'
import { videos } from './routes/video-router'

const app = express()
const port = process.env.port || 4000

const parserMiddleware = bodyParser({})

app.use(parserMiddleware)

app.use('/hometask_01/api/videos', videoRouter)

app.delete('/ht_01/api/testing/all-data', (req: Request, res: Response) => {
  videos.splice(-1, 1);
  res.status(404)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
