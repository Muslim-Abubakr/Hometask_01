"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videos = exports.videoRouter = void 0;
const express_1 = require("express");
exports.videoRouter = (0, express_1.Router)({});
exports.videos = [{
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
];
const permissionValues = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160'];
const HTTP_STATUSES = {
    OK200: 200,
    CREATED_201: 201,
    NO_CONTENT: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
exports.videoRouter.get('/', (req, res) => {
    res
        .send(exports.videos)
        .status(HTTP_STATUSES.OK200);
});
exports.videoRouter.get('/:id', (req, res) => {
    let foundVideo = exports.videos.find(v => v.id === +req.params.id);
    if (foundVideo) {
        res
            .send(foundVideo)
            .status(HTTP_STATUSES.OK200);
    }
    else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
});
exports.videoRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < exports.videos.length; i++) {
        if (exports.videos[i].id === +req.params.id) {
            exports.videos.splice(i, 1);
            res.send(HTTP_STATUSES.NO_CONTENT);
            return;
        }
        else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        }
    }
});
exports.videoRouter.post('/', (req, res) => {
    let title = req.body.title;
    let author = req.body.author;
    let avaiResol = req.body.availableResolutions;
    let errorsMessages = [];
    if (!title || typeof title !== 'string' || !title.trim()) {
        res
            .sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            .send({
            errorsMessages: [{
                    "message": "Incorrect title",
                    "field": "title"
                }]
        });
        return;
    }
    const newVideo = {
        id: +(new Date()),
        title: title,
        author: author
    };
    exports.videos.push(newVideo);
    res
        .send(newVideo)
        .status(201);
});
exports.videoRouter.put('/:id', (req, res) => {
    const foundVideo = exports.videos.find(v => v.id === +req.params.id);
    let title = req.body.title;
    if (!foundVideo) {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    if (!title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400).send({
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
