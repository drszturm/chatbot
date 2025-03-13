import Validator from 'src/core/config/validator';

export default class ClientMessageValidator extends Validator {
  constructor(private readonly message: ReceivedMessage) {
    super();
  }

  validate(): void {
    if (this.message == null) {
      this.errors.push('invalid state');
      return;
    }

    if (this.message.message === null || this.message.message === '')
      this.errors.push('Message cannot be null');

    if (this.message.phone === null || this.message.phone === '')
      this.errors.push('Phone cannot be null');
  }
}
