import { Request, Response, Router } from "express";

export const videoRouter = Router({})

const db = {
    videos: [
      
      { 
      "id": 0,
      "title": "string",
      "author": "string",
      "canBeDownloaded": true,
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
  
videoRouter.delete('', (req: Request, res: Response) => {
    db.videos  = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT)
  })
  
videoRouter.get('/', (req: Request, res: Response) => {
    let foundAllVideos = db.videos
  
    res
        .send(foundAllVideos)
        .status(HTTP_STATUSES.OK200)
  })
  
videoRouter.get('/:id', (req: Request, res: Response) => {
    let foundVideo = db.videos.find(v => v.id === +req.params.id)
  
    if (foundVideo) {
      res
          .json(foundVideo)
          .status(HTTP_STATUSES.OK200)
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
  })
  
videoRouter.delete('/:id', (req: Request, res: Response) => {
    db.videos = db.videos.filter(v => v.id !== +req.params.id)
  
    res.sendStatus(HTTP_STATUSES.NO_CONTENT)
  })

videoRouter.post('/', (req: Request, res: Response) => {

    let title = req.body.title
    if (!title) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
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
        author: "Muslim_Abubakarov",
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
        .status(HTTP_STATUSES.CREATED_201)
        .json(createdVideo)
    
  })

 videoRouter.put('/:id', (req: Request, res: Response) => {
    const foundVideo = db.videos.find(v => v.id === +req.params.id)
    let title = req.body.title
    if (!foundVideo) {
        res.status(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    if (!title) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
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
