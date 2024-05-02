import express from "express";
import bodyParser from "body-parser";
import {blogsController} from "./controllers/blogsController";
import {testingController} from "./controllers/testingController";
import {postsController} from "./controllers/postsController";
import {usersController} from "./controllers/usersController";
import {authController} from "./controllers/authController";


export const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const parserMiddleware = bodyParser({});

app.use(parserMiddleware);

app.use('/blogs', blogsController);
app.use('/posts', postsController);
app.use('/users', usersController);
app.use('/auth', authController);
app.use('/testing/all-data', testingController);
