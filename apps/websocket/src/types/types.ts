export const SUBSCRIBE = "SUBSCRIBE"
export const UNSUBSCRIBE = "UNSUBSCRIBE"

export type SubscribeMessage = {
    method : typeof SUBSCRIBE,
    groupId : string,
    userId : string
}

export type UnSubscribeMessage = {
    method : typeof UNSUBSCRIBE,
    groupId : string,
    userId : string
}


export type IncomingMessage = UnSubscribeMessage | SubscribeMessage