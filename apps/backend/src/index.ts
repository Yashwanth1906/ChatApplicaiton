import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { userRouter } from "./routes/userRoute";
import { initPassport } from "./passport";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import { prisma } from "./db";
import { adminRouter } from "./routes/adminRoute";
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
app.use("/api/v1/admin",adminRouter)
app.use

app.get("/test",async(req : any,res : any)=>{
    try{
        const usersDeleted = await prisma.user.deleteMany({})
        res.send("Thalla")
    } catch(e){
        console.log(e)
        res.send(e)
    }
})