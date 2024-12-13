import { WebSocket } from "ws"
import { IncomingMessage, PUBLISH, SUBSCRIBE, UNSUBSCRIBE } from "./types/types";
import { SubscriptionManager } from "./SubscriptionManager";

export class User{
    private id : string;
    private ws : WebSocket;
    public constructor(id :string,ws : WebSocket){
        this.id = id;
        this.ws = ws;
        this.emit(id);
         this.addListeners();
    }

    public emit(message : string){
        console.log("from emit: "+message);
        this.ws.send(JSON.stringify(message));
    }
    

    private addListeners = ()=>{
        this.ws.on("message",(message:string)=>{
            const parsedMessage : IncomingMessage = JSON.parse(message);
            if(parsedMessage.method === SUBSCRIBE){
                SubscriptionManager.getInstance().subscribe(parsedMessage.groupId,parsedMessage.userId,parsedMessage.wsId);
            }
            if(parsedMessage.method === UNSUBSCRIBE){
                SubscriptionManager.getInstance().unsubscibe(parsedMessage.groupId,parsedMessage.userId,parsedMessage.wsId)
            }
            if(parsedMessage.method === PUBLISH){
                SubscriptionManager.getInstance().publish(parsedMessage.groupId,parsedMessage.userId,parsedMessage.message,parsedMessage.wsId)
            }
        })
    }
}