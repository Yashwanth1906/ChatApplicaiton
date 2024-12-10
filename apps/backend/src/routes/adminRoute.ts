import express from "express"
import { prisma } from "../db";
import { auth } from "../middleware/auth";
import { createGroup, joinGroup } from "../controllers/adminController";

export const adminRouter = express.Router();

adminRouter.post("/creategroup",auth,createGroup)
adminRouter.post("/joingroup",auth,joinGroup)
