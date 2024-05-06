import {CommentType, OutputCommentType, OutputPostType, OutputUserType, PostType, UserDBType} from "../utils/types";
import {usersRepository} from "../repositories/users-repository";
import bcrypt from 'bcrypt'
import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {usersQueryRepository} from "../repositories/query-repositories/users-query-repository";
import {PostMapper, postsRepository} from "../repositories/posts-repository";
import {commentsRepository} from "../repositories/comments-repository";
import {postsCollection} from "../repositories/db";
import {body} from "express-validator";

export const comments = [] as OutputCommentType[]

export const commentsService: any = {
    async createComment(body: CommentType, postID: string, userID:string, userLogin:string): Promise<OutputCommentType | null> {
        const newComment: CommentType = {
            postId:postID,
            content: body.content,
            commentatorInfo: {
                userId: userID,
                userLogin: userLogin
            },
            createdAt: new Date().toISOString()
        }
        const createdComment: OutputCommentType | null = await commentsRepository.createComment(newComment, postID);
        return createdComment
    },
    async deleteComment(commentID: string): Promise<boolean> {
        return await commentsRepository.deleteComment(commentID);
    },
    async updateComment(commentID: string, body: CommentType): Promise<boolean> {
        return await commentsRepository.updateComment(commentID, body);
    },

}