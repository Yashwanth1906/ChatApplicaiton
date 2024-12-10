import passport from "passport"
import bcrypt, { hash } from "bcryptjs"
import { prisma } from "../db";

export const userSignIn = async(req:any,res:any,next : any)=>{
    console.log(req.body)
    //@ts-ignore
    passport.authenticate("phone-login",(err,user,info)=>{
        console.log(user);
        if(err) return next(err);
        if(!user){
            return res.status(500).json({message:"User not found"})
        }
        req.logIn(user,(err : any)=>{
            if(err) return next(err);
            return res.status(200).json({message:"User logged in",user})
        })
    })(req,res,next);
}

export const userSignUp = async(req:any,res:any) =>{
    try{
        const {username,name,phoneno,password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        const newUser = await prisma.user.create({
            data:{
                username : username,
                name : name,
                phoneNo : phoneno,
                password : hashedPass
            }
        })
        res.status(200).json({"user":newUser})
    } catch(e){
        console.log(e)
        res.status(500).json({"message":e})
    }
}


export const googleCallBack = async(req:any,res : any) =>{
    passport.authenticate('google',{
        successRedirect : "http://localhost:5173/good",
        failureRedirect : '/login/failed'
    })
}

export const LogOut  = (req: any,res : any) =>{
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
}

export const getGroups = async(req:any,res: any) =>{
    try{
        const groups = await prisma.userGroups.findMany({
            //@ts-ignore
            where:{
                userId: req.user.i
            },select:{
                groups:true
            }
        })
        console.log(groups);
        res.status(200).json({groups: groups})
    } catch(e){
        console.log(e);
    }
}