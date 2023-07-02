import { Request, Response, Router } from "express";

export const videoRouter = Router({})

export let videos = [{
    "id": 1,
    "title": "string",
    "author": "string",
    "canBeDownloaded": false,
    "minAgeRestriction": null,
    "createdAt": new Date().toISOString(),
    "publicationDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    "availableResolutions": ["P144"]
}, {
    "id": 2,
    "title": "string",
    "author": "string",
    "canBeDownloaded": false,
    "minAgeRestriction": null,
    "createdAt": new Date().toISOString(),
    "publicationDate": new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(),
    "availableResolutions": ["P144"]
}
]

const permissionValues = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']

  const HTTP_STATUSES = {
    OK200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,
  
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
  }
  
  
videoRouter.get('/', (req: Request, res: Response) => {
    res
        .send(videos)
        .status(HTTP_STATUSES.OK200)
})
  
videoRouter.get('/:id', (req: Request, res: Response) => {
    let foundVideo = videos.find(v => v.id === +req.params.id)
  
    if (foundVideo) {
      res
          .send(foundVideo)
          .status(HTTP_STATUSES.OK200)
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
})
  
videoRouter.delete('/:id', (req: Request, res: Response) => {
  for (let i = 0; i < videos.length; i++) {
    if (videos[i].id === +req.params.id) {
      videos.splice(i, 1)
      res.send(HTTP_STATUSES.NO_CONTENT)
      return;
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
  }

})

videoRouter.post('/', (req: Request, res: Response) => {
  let title = req.body.title
  let author = req.body.author
  let avaiResol = req.body.availableResolutions

  let errorsMessages = []

  if (!title || typeof title !== 'string' || !title.trim()) {
    res
        .sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
        .send({
          errorsMessages: [{
            "message": "Incorrect title",
            "field": "title"
          }]
        })
        return;
  }

  const newVideo = {
    id: +(new Date()),
    title: title,
    author: author
  }

  videos.push(newVideo)
  res
      .send(newVideo)
      .status(201)

})

 videoRouter.put('/:id', (req: Request, res: Response) => {
    const foundVideo = videos.find(v => v.id === +req.params.id)
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
