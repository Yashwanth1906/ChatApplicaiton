import { createClient,RedisClientType } from "redis";
import { UserManager } from "./UserManager";

export class SubscriptionManager{
    private userGroupMapping : Map<string,string[]> = new Map();
    private groupUserMapping : Map<string,string[]> = new Map();
    private static instance : SubscriptionManager;
    private redisClient : RedisClientType;
    
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

    public subscribe(groupId : string,userId : string){
        if(this.userGroupMapping.get(userId)?.includes(groupId)){
            return;
        }
        this.userGroupMapping.set(userId,(this.userGroupMapping.get(userId) || []).concat(groupId));
        this.groupUserMapping.set(groupId,(this.groupUserMapping.get(groupId) || []).concat(userId));

        if(this.groupUserMapping.get(groupId)?.length === 1){
            this.redisClient.subscribe(groupId,this.redisCallbackHandler)
        }
    }
    
    private redisCallbackHandler = (message :string,channel : string) =>{
        const paresedMessage = JSON.parse(message);
        this.groupUserMapping.get(channel)?.forEach(s => UserManager.getInstance().getUser(s)?.emit(paresedMessage))
    }

    public unsubscibe(groupId : string,userId : string){
        const group = this.userGroupMapping.get(userId);
        if(group){
            this.userGroupMapping.set(userId,group.filter(s => s !== groupId));
            if(this.userGroupMapping.get(userId)?.length === 0){
                this.userGroupMapping.delete(userId);
            }
        }
        const user = this.groupUserMapping.get(groupId);
        if(user){
            this.groupUserMapping.set(groupId,user?.filter(s => s !== userId));
            if(this.groupUserMapping.get(groupId)?.length === 0){
                this.groupUserMapping.delete(groupId);
                this.redisClient.unsubscribe(groupId)
            }
        }
    }

    public userLeft(userId : string){
        this.userGroupMapping.get(userId)?.forEach(s => this.unsubscibe(s,userId));
    }
}