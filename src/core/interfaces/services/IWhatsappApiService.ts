export default interface IWhatsappApiService {
    forwardMessageToClient(client: Client, message: ReceivedMessage): void;
    forwardMessageToGroup(group: Group, message: string): void;
    getGroupById(groupId: string): Group;
    createGroup(group: Group): Promise<string>; 
} 