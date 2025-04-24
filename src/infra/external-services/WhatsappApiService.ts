import { Injectable } from '@nestjs/common';

export const WhatsappApiServiceToken = 'WhatsappApiServiceToken';

@Injectable()
export class WhatsappApiService {
  private url = process.env.EVOLUTION_API_URL;
  private token = process.env.EVOLUTION_API_TOKEN;
  private instance = process.env.EVOLUTION_API_INSTANCE;
  private BOT_PHONE = process.env.BOT_PHONE;
  private counter = 0;

  async sendMessage(to: string, from: string, message: string): Promise<void> {
    try {
      const raw = JSON.stringify({
        phone: '55' + to,
        message: message,
        delayMessage: 15,
      });

      let response = await fetch(`${this.url}/${this.token}/send-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: raw,
        redirect: 'follow',
      });

      // retry dentro da instancia da classe
      // tenta 3 vezes e desiste
      this.counter = 0;
      if (response.status != 202 && this.counter < 3) {
        this.counter++;
        this.sendMessage(to, from, message);
      }
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      throw error;
    } finally {
      this.counter = 0;
    }
  }

  async createGroup(name: string, phones: string[]): Promise<string> {
    const raw = JSON.stringify({
      autoInvite: true,
      groupName: name,
      phones: phones,
    });
    try {
      let response = await fetch(
        `${this.url}/${this.instance}/token/${this.token}/create-group`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: raw,
          redirect: 'follow',
        },
      );

      // retry dentro da instancia da classe
      // tenta 3 vezes e desiste
      if (response.status != 200 && this.counter < 3) {
        this.counter++;
        let response = await this.createGroup(name, phones);

        if (response.length > 0) return response;
      }

      this.counter = 0;
      let group = await response.json();

      // phone é o groupId de lá 
      return group.phone;
    } catch (error) {
      console.error('Failed to create WhatsApp group:', error);
      throw error;
    } finally {
      this.counter = 0;
    }
  }

  async forwardMessage(
    phone: string,
    messageId: string,
    phoneReference: string,
  ): Promise<string> {
    const raw = JSON.stringify({
      phone: phone,
      messageId: messageId,
      messagePhone: phoneReference,
    });

    try {
      let response = await fetch(
        `${this.url}/${this.instance}/token/${this.token}/forward-message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: raw,
          redirect: 'follow',
        },
      );

      // retry dentro da instancia da classe
      // tenta 3 vezes e desiste
      if (response.status != 200 && this.counter < 3) {
        this.counter++;
        let response = await this.forwardMessage(
          phone,
          messageId,
          phoneReference,
        );

        if (response.length > 0) return response;
      }

      this.counter = 0;
      let data = await response.json();
      return data.zaapId;
    } catch (error) {
      console.error('Failed to create WhatsApp group:', error);
      throw error;
    } finally {
      this.counter = 0;
    }
  }
}
