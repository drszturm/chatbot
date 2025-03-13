export default interface IWhatsappApiService {
    forwardMessageToGroup(group: Group, message: string): void;
    createGroup(group: Group): Promise<string>; 
} 