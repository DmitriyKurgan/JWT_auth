import {Request, Response, Router} from "express";
import {CodeResponsesEnum} from "../utils/utils";
import {
    authMiddleware, checkIsForbidden,
    validateCommentsRequests,
    validateErrorsMiddleware,
    validationCommentsFindByParamId,
} from "../middlewares/middlewares";
import {OutputCommentType} from "../utils/types";
import {commentsQueryRepository} from "../repositories/query-repositories/comments-query-repository";
import {commentsService} from "../services/comments-service";

export const commentsController = Router({});

commentsController.get('/:id',
    validationCommentsFindByParamId,
    validateErrorsMiddleware,
    async (req: Request, res: Response) => {
    debugger
    const commentID = req.params.id;
    const commentByID: OutputCommentType | null = await commentsQueryRepository.findCommentByID(commentID);
    if (!commentID || !commentByID) {
        return res.sendStatus(CodeResponsesEnum.Not_found_404);
    }
    res.status(CodeResponsesEnum.OK_200).send(commentByID);
})


commentsController.put('/:id',
    authMiddleware,
    checkIsForbidden,
    validationCommentsFindByParamId,
    validateCommentsRequests,
    validateErrorsMiddleware,
    async (req: Request, res: Response) => {
    debugger
    const commentID = req.params.id;
    const isUpdated: boolean = await commentsService.updateComment(commentID, req.body);
    if (!isUpdated) {
        return res.sendStatus(CodeResponsesEnum.Not_found_404);
    }
    res.sendStatus(CodeResponsesEnum.Not_content_204);
});

commentsController.delete('/:id',
    authMiddleware,
    checkIsForbidden,
    validationCommentsFindByParamId,
    validateErrorsMiddleware,
    async (req: Request, res: Response) => {
    const commentID: string = req.params.id;
    const isDeleted: boolean = await commentsService.deleteComment(commentID);
    if (!isDeleted || !commentID) {
        return res.sendStatus(CodeResponsesEnum.Not_found_404);
    }
    res.sendStatus(CodeResponsesEnum.Not_content_204);
})


