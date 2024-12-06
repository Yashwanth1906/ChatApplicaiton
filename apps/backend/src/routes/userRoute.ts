import express from "express"
import { googleCallBack, userSignIn, userSignUp } from "../controllers/userController";
import passport, { authenticate } from "passport";


export const userRouter = express.Router();


userRouter.post("/signinWithEmail",userSignIn);
userRouter.get("/signinWithGoogle",passport.authenticate('google',{scope : ['profile','email']}));
userRouter.post("/signup",userSignUp);
userRouter.get("/google/callback",passport.authenticate('google',{
    successRedirect : "http://localhost:5173/",
    failureRedirect : '/login/failed'
}));

userRouter.get("/isauth",(req: any,res : any) =>{
    if(req.isAuthenticated()){
        res.json({authenticated : true,user: req.user})
    } else{
        res.json({authenticated: false,user: null})
    }
})

userRouter.get("/logout",(req: any,res : any) =>{
    req.logout((err : any)=>{
        if(err){
            console.log(err);
            res.send("Failed to logout")
            res.status(500).json({isLoggedOut: false,err : err})
        } else{
            req.session.destroy((err : any)=>{
                if(err){
                    //res.send("Failed to destroy sesssion")
                    res.status(500).json({isLoggedOut: false,err : err})
                } else {
                    res.clearCookie("connect.sid");
                    res.status(200).json({isLoggedOut: true})
                }
            })
        }
    })
})