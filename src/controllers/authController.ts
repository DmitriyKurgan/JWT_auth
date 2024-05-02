import {Request, Response, Router} from "express";
import {usersService} from "../services/users-service";
import {CodeResponsesEnum} from "../utils/utils";
import {validateAuthRequests, validateErrorsMiddleware} from "../middlewares/middlewares";

export const authController = Router({});

authController.post('/login', validateAuthRequests, validateErrorsMiddleware, async (req: Request, res: Response) => {
     const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
      if (checkResult){
        res.sendStatus(CodeResponsesEnum.Not_content_204)
          return;
      }
      res.sendStatus(401)
});

