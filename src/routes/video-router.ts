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

const errors = {
    errorsMessages: [
        {}
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
  
    res.send(foundAllVideos)
    res.sendStatus(HTTP_STATUSES.OK200)
  })
  
videoRouter.get('/:id', (req: Request, res: Response) => {
    let foundVideo = db.videos.find(v => v.id === +req.params.id)
  
    if (foundVideo) {
      res.json(foundVideo)
      res.sendStatus(HTTP_STATUSES.OK200)
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
  })
  
videoRouter.delete('/:id', (req: Request, res: Response) => {
    db.videos = db.videos.filter(v => v.id !== +req.params.id)
  
    res.sendStatus(HTTP_STATUSES.NO_CONTENT)
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  })

videoRouter.post('/', (req: Request, res: Response) => {

    if (!req.body.title || !req.body.author) {
        errors.errorsMessages.push(
            {
                "message": "",
                "field": ""
            }
        )

        res
        .json(errors)
        .status(HTTP_STATUSES.BAD_REQUEST_400)
        return;
    }

    const currentDate = new Date();
    const isoDate = currentDate.toISOString()

    const createdVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
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

/*  videoRouter.put('/:id', (req: Request, res: Response) => {
    const foundVideo = db.videos.find(v => v.id === +req.params.id)

    if (!foundVideo) {
        res.status(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    foundVideo.title = req.body.title
    foundVideo.author = req.body.title

    res.send(foundVideo)

*/

//})

// const errorsMessages =[];
// if(true){
//   errors.push({
//     message: 'ee',
//     field: 'author'
//   })
// }

// res.status(400).json(errorsMessages)

