import {commentsCollection, postsCollection} from "../repositories/db";
import {ObjectId, WithId, InsertOneResult, UpdateResult, DeleteResult} from "mongodb";
import {CommentType, OutputCommentType, OutputPostType, PostType} from "../utils/types";
import {CommentMapper} from "./query-repositories/comments-query-repository";
export const posts = [] as PostType[]

export const commentsRepository = {
   async createComment(newComment:CommentType, postID:string):Promise<OutputCommentType | null> {
       const result:InsertOneResult<CommentType> = await commentsCollection.insertOne(newComment)
       const comment:WithId<CommentType> | null = await commentsCollection.findOne({_id:result.insertedId})
       return comment ? CommentMapper(comment, postID) : null

    },
   async updatePost(postID:string, body:PostType): Promise<boolean> {
        const result: UpdateResult<PostType> = await postsCollection.updateOne({_id: new ObjectId(postID)},
            {$set: {
                    title: body.title,
                    shortDescription: body.shortDescription,
                    content: body.content,
                    blogId: body.blogId
                }});
       return result.matchedCount === 1
    },
   async deletePost(postID:string){

        const result: DeleteResult = await postsCollection.deleteOne({_id: new ObjectId(postID)})

       return result.deletedCount === 1
    }

}