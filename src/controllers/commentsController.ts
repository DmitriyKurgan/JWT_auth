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

export const commentsController = Router({});

commentsController.get('/:id', validationCommentsFindByParamId, validateErrorsMiddleware, async (req: Request, res: Response) => {
    debugger
    const commentID = req.params.id;
    const commentByID:OutputCommentType|null = await commentsQueryRepository.findCommentByID(commentID);
    if (!commentID || !commentByID){
        return res.sendStatus(CodeResponsesEnum.Not_found_404);
    }
    res.status(CodeResponsesEnum.OK_200).send(commentByID);
})


// commentsController.put('/', validateAuthorization, validateUsersRequests, validateErrorsMiddleware, async (req: Request, res: Response) => {
//     const newUser: OutputUserType | null = await usersService.createUser(req.body.login, req.body.email, req.body.password);
//     if (newUser) {
//         users.push(newUser);
//         res.status(CodeResponsesEnum.Created_201).send(newUser);
//     }
// });
//
// commentsController.delete('/:id', validateAuthorization, validateDeleteUserByParamId, validateErrorsMiddleware, async (req: Request, res: Response) => {
//     const userID: string = req.params.id;
//     const isDeleted: boolean = await usersService.deleteUser(userID);
//     if (!isDeleted || !userID) {
//         return res.sendStatus(CodeResponsesEnum.Not_found_404);
//     }
//     res.sendStatus(CodeResponsesEnum.Not_content_204);
// })


