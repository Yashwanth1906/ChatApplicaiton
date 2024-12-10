import express from "express"
import { getGroups, googleCallBack, LogOut, userSignIn, userSignUp } from "../controllers/userController";
import passport, { authenticate } from "passport";
import { prisma } from "../db";
import { auth } from "../middleware/auth";


export const userRouter = express.Router();

userRouter.post("/signup",userSignUp);
userRouter.post("/signinWithEmail",userSignIn);
userRouter.get("/signinWithGoogle",passport.authenticate('google',{scope : ['profile','email']}));
userRouter.get("/google/callback",passport.authenticate('google',{
    successRedirect : "http://localhost:5173/",
    failureRedirect : '/login/failed'
}));
userRouter.get("/logout",LogOut)
userRouter.get("/getgroups",auth,getGroups);