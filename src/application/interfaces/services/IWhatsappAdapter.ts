import { Group } from "@domain/entities/group.entity";

export const IWhatsappAdapterToken: string = "IWhatsappAdapter";
export interface IWhatsappAdapter {
    forwardMessageToClient(client: Client, group: Group, message: ReceivedMessage): Promise<string>;
    forwardMessageToGroup(group: Group, message: ReceivedMessage): Promise<string>;
    getGroupById(groupId: string): Group;
    createGroup(group: Group): Promise<string>; 
} 