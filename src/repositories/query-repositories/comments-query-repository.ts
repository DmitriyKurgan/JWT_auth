import {CommentType, OutputCommentType, OutputUserType, UserDBType, UserType} from "../../utils/types";
import {ObjectId, WithId} from "mongodb";
import {getCommentsFromDB, getPostsFromDB, getUsersFromDB} from "../../utils/utils";
import {commentsCollection, usersCollection} from "../db";

export const CommentMapper = (comment : WithId<CommentType>,postID?:string) : OutputCommentType => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo:{
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin,
        },
        createdAt:comment.createdAt
    }
}

export const commentsQueryRepository = {
    async getAllUsers(query: any): Promise<any | { error: string }> {
        return getUsersFromDB(query);
    },
    async findByLoginOrEmail(loginOrEmail:string){
        const user = await usersCollection.findOne({$or: [{login:loginOrEmail}, {email:loginOrEmail}]})
        return user
},
    async findAllCommentsByPostID(postID: string, query:any):Promise<any | { error: string }> {
        return getCommentsFromDB(query, postID)
    },
    async findCommentByID(commentID:string){
        const comment = await commentsCollection.findOne({_id: new ObjectId(commentID)})
        return comment ? CommentMapper(comment) : null
    }
}
