import { WebSocket } from "ws";
import { SubscriptionManager } from "./SubscriptionManager";
import { User } from "./User";

export class UserManager{
    private static instance : UserManager;
    private users : Map<string,User> = new Map();
    
    private constructor(){

    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new UserManager();
        }
        return this.instance;
    }

    public addUser(ws : WebSocket){
        const id = this.getRandomId();
        const user = new User(id,ws);
        this.users.set(id,user);
        this.registerClose(ws,id);
        return user;
    }

    private registerClose = (ws : WebSocket,id : string)=>{
        ws.on("close",()=>{
            this.users.delete(id);
            SubscriptionManager.getInstance().userLeft(id);
        })
    }

    private getRandomId =() =>{
        return Math.random().toString(36).substring(2,15) + Math.random().toString(36).substring(2,15);
    }

    public getUser(id : string) : User | undefined{
        return this.users.get(id);
    }


}