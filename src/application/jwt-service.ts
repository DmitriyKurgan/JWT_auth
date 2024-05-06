import {AccessTokenType, OutputUserType, UserDBType} from "../utils/types";
import {usersRepository} from "../repositories/users-repository";
import bcrypt from 'bcrypt'
import {ObjectId, WithId} from "mongodb";
import {usersQueryRepository} from "../repositories/query-repositories/users-query-repository";
import jwt from 'jsonwebtoken';
import {settings} from "../settings";
export const users = [] as OutputUserType[]

export const jwtService:any = {

    async createJWT(user:UserDBType):Promise<AccessTokenType> {
        const accessToken = {
            accessToken:  jwt.sign({userId:user._id}, settings.JWT_SECRET, {expiresIn:'90h'})
        }
        return accessToken
    },
    async getUserIdByToken(token:string):Promise<ObjectId | null>{
        try {
           const result:any = jwt.verify(token, settings.JWT_SECRET);
           return result.userId;
        } catch (e:unknown) {
            return null
        }
    }

}