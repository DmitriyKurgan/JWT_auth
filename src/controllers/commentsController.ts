import {Request, Response, Router} from "express";
import {CodeResponsesEnum, getQueryValues} from "../utils/utils";
import {
    validateAuthorization, validateDeleteUserByParamId,
    validateErrorsMiddleware, validateUsersRequests, validationCommentsFindByParamId,
} from "../middlewares/middlewares";
import {users, usersService} from "../services/users-service";
import {usersQueryRepository} from "../repositories/query-repositories/users-query-repository";
import {OutputBlogType, OutputCommentType, OutputUserType} from "../utils/types";
import {blogsQueryRepository} from "../repositories/query-repositories/blogs-query-repository";
import {commentsQueryRepository} from "../repositories/query-repositories/comments-query-repository";
import {comments, commentsService} from "../services/comments-service";
import {body} from "express-validator";

export const commentsController = Router({});

commentsController.get('/:id', async (req: Request, res: Response) => {
    debugger
    const commentID = req.params.id;
    const commentByID:OutputCommentType|null = await commentsQueryRepository.findCommentByID(commentID);
    if (!commentID || !commentByID){
        return res.sendStatus(CodeResponsesEnum.Not_found_404);
    }
    res.status(CodeResponsesEnum.OK_200).send(commentByID);
})


commentsController.put('/:id', validateAuthorization, validateErrorsMiddleware, async (req: Request, res: Response) => {
    const newComment: OutputCommentType | null = await commentsService.updateComment(req.params.id, req.body);
    if (newComment) {
        comments.push(newComment);
        res.status(CodeResponsesEnum.Created_201).send(newComment);
    }
});

commentsController.delete('/:id', validateAuthorization, validateErrorsMiddleware, async (req: Request, res: Response) => {
    const commentID: string = req.params.id;
    const isDeleted: boolean = await commentsService.deleteComment(commentID);
    if (!isDeleted || !commentID) {
        return res.sendStatus(CodeResponsesEnum.Not_found_404);
    }
    res.sendStatus(CodeResponsesEnum.Not_content_204);
})


