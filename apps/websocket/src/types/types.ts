export const SUBSCRIBE = "SUBSCRIBE"
export const UNSUBSCRIBE = "UNSUBSCRIBE"
export const PUBLISH = "PUBLISH"

export type SubscribeMessage = {
    method : typeof SUBSCRIBE,
    groupId : string,
    userId : string,
    wsId : string
}

export type UnSubscribeMessage = {
    method : typeof UNSUBSCRIBE,
    groupId : string,
    userId : string,
    wsId : string
}

export type PublishMessage = {
    method : typeof PUBLISH,
    groupId : string,
    userId : string,
    message : string,
    wsId : string
}

export type IncomingMessage = UnSubscribeMessage | SubscribeMessage | PublishMessage