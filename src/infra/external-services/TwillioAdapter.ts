import IWhatsappApiService from '@application/interfaces/services/IWhatsappApiService';
import { Group } from '@domain/entities/group.entity';

export class TwillioAdapter implements IWhatsappApiService {
  forwardMessageToClient(client: Client, message: ReceivedMessage): void {
    throw new Error('Method not implemented.');
  }
  forwardMessageToGroup(group: Group, message: string): void {
    throw new Error('Method not implemented.');
  }
  getGroupById(groupId: string): Group {
    throw new Error('Method not implemented.');
  }
  createGroup(group: Group): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
