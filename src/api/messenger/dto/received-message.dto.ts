type ReceivedMessageDto = {
    
        numberId: number
        key: {
            remoteJid: string,
            fromMe: boolean,
            id:string
        },
        pushName: string
        message: {
            conversation: string
        },
        messageType:string
    }
