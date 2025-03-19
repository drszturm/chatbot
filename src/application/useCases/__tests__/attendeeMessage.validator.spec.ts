import AttendeeMessageValidator from '../AttendeeMessage/attendeeMessage.validator';

describe('AttendeeMessageValidator', () => {
    it('should add an error if message is null', () => {
        const validator = new AttendeeMessageValidator(null as any);
        validator.validate();
        expect(validator.getErrors()).toContain('invalid state');
    });

    it('should add an error if groupId is null or empty', () => {
        const message = { groupId: null, text: 'Hello', phone: '123456789' };
        const validator = new AttendeeMessageValidator(message as any);
        validator.validate();
        expect(validator.getErrors()).toContain('GroupId cannot be empty');

        const messageWithEmptyGroupId = { groupId: '', text: 'Hello', phone: '123456789' };
        const validatorWithEmptyGroupId = new AttendeeMessageValidator(messageWithEmptyGroupId as any);
        validatorWithEmptyGroupId.validate();
        expect(validatorWithEmptyGroupId.getErrors()).toContain('GroupId cannot be empty');
    });

    it('should add an error if text is null or empty', () => {
        const message = { groupId: 'group1', text: null, phone: '123456789' };
        const validator = new AttendeeMessageValidator(message as any);
        validator.validate();
        expect(validator.getErrors()).toContain('Message cannot be empty');

        const messageWithEmptyText = { groupId: 'group1', text: '', phone: '123456789' };
        const validatorWithEmptyText = new AttendeeMessageValidator(messageWithEmptyText as any);
        validatorWithEmptyText.validate();
        expect(validatorWithEmptyText.getErrors()).toContain('Message cannot be empty');
    });

    it('should add an error if phone is null or empty', () => {
        const message = { groupId: 'group1', text: 'Hello', phone: null };
        const validator = new AttendeeMessageValidator(message as any);
        validator.validate();
        expect(validator.getErrors()).toContain('Phone cannot be empty');

        const messageWithEmptyPhone = { groupId: 'group1', text: 'Hello', phone: '' };
        const validatorWithEmptyPhone = new AttendeeMessageValidator(messageWithEmptyPhone as any);
        validatorWithEmptyPhone.validate();
        expect(validatorWithEmptyPhone.getErrors()).toContain('Phone cannot be empty');
    });

    it('should not add any errors if message is valid', () => {
        const message = { groupId: 'group1', text: 'Hello', phone: '123456789' };
        const validator = new AttendeeMessageValidator(message as any);
        validator.validate();
        expect(validator.getErrors()).toHaveLength(0);
    });
});