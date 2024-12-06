import express from "express"
import { googleCallBack, userSignIn, userSignUp } from "../controllers/userController";
import passport from "passport";


export const userRouter = express.Router();


userRouter.post("/signinWithEmail",userSignIn);
userRouter.get("/signinWithGoogle",passport.authenticate('google',{scope : ['profile','email']}));
userRouter.post("/signup",userSignUp);
userRouter.get("/google/callback",passport.authenticate('google',{
    successRedirect : "http://localhost:5173/good",
    failureRedirect : '/login/failed'
}));