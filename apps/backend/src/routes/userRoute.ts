import express from "express"
import { googleCallBack, userSignIn, userSignUp } from "../controllers/userController";
import passport, { authenticate } from "passport";
import { prisma } from "../db";


export const userRouter = express.Router();


userRouter.post("/signinWithEmail",userSignIn);
userRouter.get("/signinWithGoogle",passport.authenticate('google',{scope : ['profile','email']}));
userRouter.post("/signup",userSignUp);
userRouter.get("/google/callback",passport.authenticate('google',{
    successRedirect : "http://localhost:5173/",
    failureRedirect : '/login/failed'
}));

userRouter.get("/isauth",async(req: any,res : any) =>{
    console.log("ISAUTh CALLED")
    if(req.isAuthenticated()){
        console.log("Users: ",req.user);
        const user = await prisma.user.findUnique({
            where:{
                id : req.user.id
            },select:{
                id : true,
                name:true
            }
        })
        res.json({authenticated : true,user: user})
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