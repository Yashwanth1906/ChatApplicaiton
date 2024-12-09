import passport from "passport";
//@ts-ignore
import {Strategy as GoogleStartegy} from "passport-google-oauth20";
import { prisma } from "./db";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID? process.env.GOOGLE_CLIENT_ID : "";
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET? process.env.GOOGLE_CLIENT_SECRET : "";

console.log(GOOGLE_CLIENT_ID)

export const initPassport =()=>{
    passport.use(
        new GoogleStartegy(
            {
                clientID : GOOGLE_CLIENT_ID || "87001147804-h6dkm6rev6b5pb53p2obtu4l2l1n2ihq.apps.googleusercontent.com",
                clientSecret: GOOGLE_CLIENT_SECRET || "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",
                callbackURL:"/api/v1/users/google/callback"
            },async(accessToken :string,refreshToken : string,profile : any,done : any)=>{
                //update or insert the user in the db here
                console.log("Storing in db")
                console.log(profile.emails[0].value);
                console.log(profile.displayName)
                const user = await prisma.user.upsert({
                    //@ts-ignore
                    create:{
                        email : profile.emails[0].value,
                        name : profile.displayName,
                    },update:{
                        name : profile.displayName
                    },where:{
                        email : profile.emails[0].value
                    }
                })
                done(null,user); // pass the user object next to null
            }
    )
    )
    passport.serializeUser((user : any,callback)=>{
        process.nextTick(()=>{
            return callback(null,{
                id : user.id,
                username : user.username,
                picture : user.picture
            })
        })
    })

    passport.deserializeUser((user : any,callback) =>{
        process.nextTick(()=>{
            return callback(null,user);
        })
    })
}