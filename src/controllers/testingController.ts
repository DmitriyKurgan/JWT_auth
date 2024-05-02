import {Request, Response, Router} from "express";
import {CodeResponsesEnum} from "../utils/utils";
import {blogsCollection, postsCollection, usersCollection} from "../repositories/db";
export const testingController = Router({})

testingController.delete('/', async (req:Request, res: Response) => {
    try {
        await blogsCollection.deleteMany({});
        await postsCollection.deleteMany({});
        await usersCollection.deleteMany({});
        res.sendStatus(CodeResponsesEnum.Not_content_204);
    } catch (error) {
        console.error("Error occurred while clearing the database:", error);
        res.sendStatus(500);
    }
})

