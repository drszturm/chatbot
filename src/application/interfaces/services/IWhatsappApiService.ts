import { Group } from "@domain/entities/group.entity";

export const IWhatsappApiServiceToken: string = "IWhatsappApiService";
export interface IWhatsappApiService {
    forwardMessageToClient(client: Client, message: ReceivedMessage): void;
    forwardMessageToGroup(group: Group, message: string): void;
    getGroupById(groupId: string): Group;
    createGroup(group: Group): Promise<string>; 
} 