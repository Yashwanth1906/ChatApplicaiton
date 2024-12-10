import passport from "passport";
//@ts-ignore
import {Strategy as GoogleStartegy} from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs"
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
    passport.use('phone-login',             // this thing is used to login using phone number and maintain session for it . 
        new LocalStrategy({                 // for that i used pasport-local in that we need to pass two fields ,
            //@ts-ignore                    // which is usernameField and we need to map it with a unique field and passwordField.
            usernameField : "phoneno",
            passwordField : "password"
        },async (phoneno,password,done) =>{
            try{
                const user = await prisma.user.findUnique({where:{phoneNo : phoneno}})
                if(!user){
                    return done(null,false,{message:"Invalid Phone Number"})
                }
                //@ts-ignore
                const match = await bcrypt.compare(password,user.password);
                if(!match){
                    return done(null,false,{message:"Wrong credentials"})
                }
                return done(null,user);
            } catch(e){
                console.log(e)
                return done(e);
            }
        }
    )
    )

    passport.serializeUser((user : any,callback)=>{
        process.nextTick(()=>{
            return callback(null,{
                id : user.id,
                username : user.username,
                // picture : user.picture
            })
        })
    })

    passport.deserializeUser((user : any,callback) =>{
        process.nextTick(()=>{
            return callback(null,user);
        })
    })
}