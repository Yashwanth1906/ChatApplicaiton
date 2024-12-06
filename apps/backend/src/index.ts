import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { userRouter } from "./routes/userRoute";
import { initPassport } from "./passport";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import { prisma } from "./db";
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

//@ts-ignore
app.use(session({
    secret : "summa-podu-pathukalam",
    resave : false,
    saveUninitialized : false,
    cookie : {secure : false , maxAge : 24 * 60 * 60 * 1000}
}))

app.use(express.json());
//@ts-ignore
app.use(cookieParser());

dotenv.config();

app.listen(6969,()=>{
    console.log("Running")
})

initPassport();
//@ts-ignore


app.use(passport.initialize());
app.use(passport.authenticate('session'));

app.use("/api/v1/users",userRouter);

app.get("/test",async(req : any,res : any)=>{
    //@ts-ignore
    // const removethisuser = await prisma.user.create({
    //     data:{
    //         "name":"Yashwanth",
    //         "username":"Yashwanth",
    //         "email":"yashwanthsakthivel01@gmail.com",
    //         "password" :"123random"
    //     }
    // })

    const users = await prisma.user.findMany({})
    //@ts-ignore
    // users.push({id: "123",username:"yashwanth",email:"yashwanthqiwq!fdsjkfsd",password:"fsdaj"});
    res.send(users);
})