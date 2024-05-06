import {Request, Response, Router} from "express";
import {usersService} from "../services/users-service";
import {CodeResponsesEnum} from "../utils/utils";
import {validateAuthRequests, validateErrorsMiddleware} from "../middlewares/middlewares";
import {jwtService} from "../application/jwt-service";

export const authController = Router({});

authController.post('/login', validateAuthRequests, validateErrorsMiddleware, async (req: Request, res: Response) => {
     const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
      if (!user){
          return res.sendStatus(CodeResponsesEnum.Unauthorized_401)
      }
    const token = await jwtService.createJWT(user);
      res.status(CodeResponsesEnum.OK_200).send(token);
});

authController.get('/me', async (req: Request, res: Response) => {
    const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password);
    if (!user){
        return res.sendStatus(CodeResponsesEnum.Unauthorized_401)
    }
    res.status(CodeResponsesEnum.OK_200).send({
        email: user.email,
        login: user.login,
        userId: user._id.toString()
    })
});

