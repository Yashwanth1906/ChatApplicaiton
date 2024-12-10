import { WebSocketServer } from "ws";
import { UserManager } from "./UserManager";

const websocket = new WebSocketServer({port:3001})

websocket.on("connection",(ws)=>{
    UserManager.getInstance().addUser(ws)
})