import { Injectable } from '@nestjs/common';
import twilio from 'twilio';

// TODO: Ajustar para acessar dados do grupo e afins 
@Injectable()
export class TwillioService {
    private client: twilio.Twilio;
    private fromNumber: string;

    constructor(accountSid: string, authToken: string, fromNumber: string) {
        this.client = twilio(accountSid, authToken);
        this.fromNumber = fromNumber;
    }

    async sendWhatsAppMessage(to: string, message: string): Promise<void> {
        try {
            const response = await this.client.messages.create({
                from: `whatsapp:${this.fromNumber}`,
                to: `whatsapp:${to}`,
                body: message,
            });
            console.log('Message sent successfully:', response.sid);
        } catch (error) {
            console.error('Failed to send WhatsApp message:', error);
            throw error;
        }
    }
}