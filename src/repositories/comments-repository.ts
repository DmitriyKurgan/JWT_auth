import {commentsCollection, postsCollection} from "../repositories/db";
import {ObjectId, WithId, InsertOneResult, UpdateResult, DeleteResult} from "mongodb";
import {CommentType, OutputCommentType, OutputPostType, PostType} from "../utils/types";
import {CommentMapper} from "./query-repositories/comments-query-repository";
export const comments = [] as PostType[]

export const commentsRepository = {
   async createComment(newComment:CommentType, postID:string):Promise<OutputCommentType | null> {
       const result:InsertOneResult<CommentType> = await commentsCollection.insertOne(newComment)
       const comment:WithId<CommentType> | null = await commentsCollection.findOne({_id:result.insertedId})
       return comment ? CommentMapper(comment, postID) : null
    },
   async updateComment(commentID:string, body:CommentType): Promise<boolean> {
       debugger
        const result: UpdateResult<CommentType> = await commentsCollection.updateOne({_id: new ObjectId(commentID)},
            {$set: {
                    content: body.content,
                    commentatorInfo: {...body.commentatorInfo},
                    createdAt:body.createdAt,
                    postId:body.postId
                }});
       return result.matchedCount === 1
    },
   async deleteComment(commentID:string){

        const result: DeleteResult = await commentsCollection.deleteOne({_id: new ObjectId(commentID)})

       return result.deletedCount === 1
    }

}