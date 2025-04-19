import { IWhatsappAdapter } from '@application/interfaces/services/IWhatsappAdapter';
import { Group } from '@domain/entities/group.entity';
import { Inject, Injectable } from '@nestjs/common';
import { WhatsappApiService, WhatsappApiServiceToken } from './WhatsappApiService';

@Injectable()
export class WhatsappAdapter implements IWhatsappAdapter {
  private fromNumber = process.env.BOT_PHONE; 
  constructor(
    @Inject(WhatsappApiServiceToken)
    private readonly whatsappService: WhatsappApiService,
  ) {}
      
  async forwardMessageToClient(client: Client, group: Group, message: ReceivedMessage): Promise<string> {
    return await this.whatsappService.forwardMessage(client.phoneNumber, message.externalId, group.id);
  }

  async forwardMessageToGroup(group: Group, message: ReceivedMessage): Promise<string> {
    return await this.whatsappService.forwardMessage(group.id, message.externalId, group.botPhone);
  }

  getGroupById(groupId: string): Group {
    throw new Error('Method not implemented.');
  }
  
  createGroup(group: Group) : Promise<string>{
    return this.whatsappService.createGroup(group.name, [group.attendeePhone]);
  }
}
