import {CommentType, OutputCommentType, OutputPostType, OutputUserType, PostType, UserDBType} from "../utils/types";
import {usersRepository} from "../repositories/users-repository";
import bcrypt from 'bcrypt'
import {InsertOneResult, ObjectId, WithId} from "mongodb";
import {usersQueryRepository} from "../repositories/query-repositories/users-query-repository";
import {PostMapper, postsRepository} from "../repositories/posts-repository";
import {commentsRepository} from "../repositories/comments-repository";
import {postsCollection} from "../repositories/db";

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
    async deleteUser(userID: string): Promise<boolean> {
        return await usersRepository.deleteUser(userID);
    },
    async checkCredentials(loginOrEmail: string, password: string): Promise<boolean> {
        const user: WithId<UserDBType> | null = await usersQueryRepository.findByLoginOrEmail(loginOrEmail);
        if (!user) {
            return false
        }
        const passwordHash = await this._generateHash(password, user.passwordSalt);

        return user.passwordHash === passwordHash;

    },
    async _generateHash(password: string, salt: string): Promise<string> {
        const hash = await bcrypt.hash(password, salt);
        return hash
    }

}