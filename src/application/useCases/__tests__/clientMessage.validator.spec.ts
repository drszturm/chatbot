import ClientMessageValidator from '../ClientMessage/clientMessage.validator';

describe('ClientMessageValidator', () => {
    it('should add "invalid state" error if message is null', () => {
        const validator = new ClientMessageValidator(null as any);
        validator.validate();
        expect(validator.getErrors()).toContain('invalid state');
    });

    it('should add "Message cannot be null" error if message.text is null', () => {
        const message = { text: null, phone: '123456789' };
        const validator = new ClientMessageValidator(message as any);
        validator.validate();
        expect(validator.getErrors()).toContain('Message cannot be null');
    });

    it('should add "Message cannot be null" error if message.text is an empty string', () => {
        const message = { text: '', phone: '123456789' };
        const validator = new ClientMessageValidator(message as any);
        validator.validate();
        expect(validator.getErrors()).toContain('Message cannot be null');
    });

    it('should add "Phone cannot be null" error if message.phone is null', () => {
        const message = { text: 'Hello', phone: null };
        const validator = new ClientMessageValidator(message as any);
        validator.validate();
        expect(validator.getErrors()).toContain('Phone cannot be null');
    });

    it('should add "Phone cannot be null" error if message.phone is an empty string', () => {
        const message = { text: 'Hello', phone: '' };
        const validator = new ClientMessageValidator(message as any);
        validator.validate();
        expect(validator.getErrors()).toContain('Phone cannot be null');
    });

    it('should not add any errors if message is valid', () => {
        const message = { text: 'Hello', phone: '123456789' };
        const validator = new ClientMessageValidator(message as any);
        validator.validate();
        expect(validator.getErrors()).toHaveLength(0);
    });
});