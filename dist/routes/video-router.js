"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
exports.videoRouter = (0, express_1.Router)({});
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
};
const HTTP_STATUSES = {
    OK200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
exports.videoRouter.delete('', (req, res) => {
    db.videos = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT);
});
exports.videoRouter.get('/', (req, res) => {
    let foundAllVideos = db.videos;
    res.send(foundAllVideos);
    res.status(HTTP_STATUSES.OK200);
});
exports.videoRouter.get('/:id', (req, res) => {
    let foundVideo = db.videos.find(v => v.id === +req.params.id);
    if (foundVideo) {
        res
            .json(foundVideo)
            .status(HTTP_STATUSES.OK200);
    }
    else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
});
exports.videoRouter.delete('/:id', (req, res) => {
    db.videos = db.videos.filter(v => v.id !== +req.params.id);
    res.sendStatus(HTTP_STATUSES.NO_CONTENT);
});
exports.videoRouter.post('/', (req, res) => {
    let title = req.body.title;
    if (!title) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                    "message": "incorrect values",
                    "field": "title"
                }]
        });
        return;
    }
    const currentDate = new Date();
    const isoDate = currentDate.toISOString();
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
    };
    db.videos.push(createdVideo);
    res
        .status(HTTP_STATUSES.CREATED_201)
        .json(createdVideo);
});
exports.videoRouter.put('/:id', (req, res) => {
    const foundVideo = db.videos.find(v => v.id === +req.params.id);
    let title = req.body.title;
    if (!foundVideo) {
        res.status(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    if (!title) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [{
                    "message": "incorrect value",
                    "field": "title"
                }]
        });
    }
    foundVideo.title = req.body.title;
    foundVideo.author = req.body.author;
    res.send(foundVideo);
});
