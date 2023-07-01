"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const video_router_1 = require("./routes/video-router");
const app = (0, express_1.default)();
const port = process.env.port || 4000;
const parserMiddleware = (0, body_parser_1.default)({});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/hometask_01/api/videos/', video_router_1.videoRouter);
app.use('/ht_01/api/testing/all-data', video_router_1.videoRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
