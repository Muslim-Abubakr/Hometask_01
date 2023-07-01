import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.port || 4000

const parserMiddleware = bodyParser({})

const db = {
  videos: [
    
    { 
    "id": 0,
    "title": "string",
    "author": "string",
    "canBeDownloaded": false,
    "minAgeRestriction": null,
    "createdAt": "2023-06-29T20:14:02.205Z",
    "publicationDate": "2023-06-29T20:14:02.205Z",
    "availableResolutions": [
      "P144"
      ]
    },

  ]
}

const HTTP_STATUSES = {
  OK200: 200,
  CREATED_201: 201,
  NO_CONTENT: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404
}


app.get('/hometask_01/api/videos', (req: Request, res: Response) => {
  res
      .json(db.videos)
      .status(HTTP_STATUSES.OK200)
})

app.get('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
  let foundVideo = db.videos.find(v => v.id === +req.params.id)

  if (foundVideo) {
    res
        .json(foundVideo)
        .status(HTTP_STATUSES.OK200)
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  }
})

app.delete('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
db.videos = db.videos.filter(v => v.id !== +req.params.id)


res.sendStatus(HTTP_STATUSES.NO_CONTENT)

})

app.post('/hometask_01/api/videos', (req: Request, res: Response) => {

  let title = req.body.title
  if (!title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400).send({
        errorsMessages: [{
          "message": "incorrect values",
          "field": "title"
        }]
      })
      return;
  }

  const currentDate = new Date();
  const isoDate = currentDate.toISOString()

  const createdVideo = {
      id: +(new Date()),
      title: title,
      author: "string",
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: isoDate,
      publicationDate: isoDate,
      availableResolutions: [
          "P144"
      ]
  }

  db.videos.push(createdVideo)

  res
      .sendStatus(HTTP_STATUSES.CREATED_201)
      .send(createdVideo)
  
})

app.put('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
  const foundVideo = db.videos.find(v => v.id === +req.params.id)
  let title = req.body.title
  if (!foundVideo) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
      return;
  }

  if (!title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400).send({
      errorsMessages: [{
        "message": "incorrect value",
        "field": "title"
      }]
    })
  }

  foundVideo.title = req.body.title
  foundVideo.author = req.body.author

  res.send(foundVideo)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
