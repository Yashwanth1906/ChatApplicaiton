import { createClient,RedisClientType } from "redis";
import { UserManager } from "./UserManager";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SubscriptionManager{
    private userGroupMapping : Map<string,string[]> = new Map();
    private groupUserMapping : Map<string,string[]> = new Map();
    private static instance : SubscriptionManager;
    private isJoinedGroup : boolean = false;
    private redisClient : RedisClientType;
    private redisPublisher : RedisClientType;
    
    private constructor (){
        this.redisClient = createClient({
            username: 'default',
            password: 'h0y8CF0rEsWPeH8NqHslgLPoLMRhKhlr',
            socket: {
                host: 'redis-17318.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
                port: 17318
            }
        });
        this.redisConnect();
        this.redisPublisher = createClient({
            username: 'default',
            password: 'h0y8CF0rEsWPeH8NqHslgLPoLMRhKhlr',
            socket: {
                host: 'redis-17318.c305.ap-south-1-1.ec2.redns.redis-cloud.com',
                port: 17318
            }
        })
        this.redisPublisher.connect();
    }

    private async redisConnect(){
        await this.redisClient.connect();
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new SubscriptionManager();
        }
        return this.instance;
    }

    public async subscribe(groupId : string,userId : string,wsId : string){
        
        const result = await prisma.userGroups.findUnique({
            //@ts-ignore
            where:{
                userId : userId,
                groupId : groupId
            }
        })
        if(result !== null){
            this.isJoinedGroup = true;
        }
        if(this.isJoinedGroup === true){
            if(this.userGroupMapping.get(wsId)?.includes(groupId)){
                return;
            }
            this.userGroupMapping.set(wsId,(this.userGroupMapping.get(wsId) || []).concat(groupId));
            this.groupUserMapping.set(groupId,(this.groupUserMapping.get(groupId) || []).concat(wsId));
    
            if(this.groupUserMapping.get(groupId)?.length === 1){
                this.redisClient.subscribe(`group@${groupId}`,this.redisCallbackHandler.bind(this))
            }
            UserManager.getInstance().getUser(wsId)?.emit("Subscribed to the channel")
        }
    }
    
    // private redisCallbackHandler = (message :string,channel : string) =>{
    //     const paresedMessage = JSON.parse(message);
    //     this.groupUserMapping.get(channel)?.forEach(s => UserManager.getInstance().getUser(s)?.emit(paresedMessage))
    // }
    private redisCallbackHandler = (message: string, channel: string) => {
        const parsedMessage = JSON.parse(message);
        const groupId = channel.replace("group@", "");
        console.log(this.groupUserMapping.get(groupId));
        this.groupUserMapping.get(groupId)?.forEach((wsId) => {
            console.log(UserManager.getInstance().getUser(wsId))
            UserManager.getInstance().getUser(wsId)?.emit(parsedMessage);
        });
    };
    

    public unsubscibe(groupId : string,userId : string,wsId : string){
        if(this.isJoinedGroup === true){
            const group = this.userGroupMapping.get(wsId);
            if(group){
                this.userGroupMapping.set(wsId,group.filter(s => s !== groupId));
                if(this.userGroupMapping.get(wsId)?.length === 0){
                    this.userGroupMapping.delete(wsId);
                }
            }
            const user = this.groupUserMapping.get(groupId);
            if(user){
                this.groupUserMapping.set(groupId,user?.filter(s => s !== wsId));
                if(this.groupUserMapping.get(groupId)?.length === 0){
                    this.groupUserMapping.delete(groupId);
                    this.redisClient.unsubscribe(`group@${groupId}`)
                }
                UserManager.getInstance().getUser(wsId)?.emit("Unsubscribed from the channel")
            }   
        }
    }

    public publish (groupId : string,userId : string,message : string,wsId : string){
        if(!this.userGroupMapping.get(wsId)?.includes(groupId)){
            this.subscribe(groupId,userId,wsId);
        }
        if(!this.groupUserMapping.get(groupId)?.includes(wsId)){
            this.subscribe(groupId,userId,wsId);
        }
        this.redisPublisher.publish(`group@${groupId}`, JSON.stringify(message));
        // UserManager.getInstance().getUser(wsId)?.emit("Subscribe to the websocket channel and then publish event")
    }

    public userLeft(userId : string,wsId : string){
        this.userGroupMapping.get(wsId)?.forEach(s => this.unsubscibe(s,userId,wsId));
    }
}