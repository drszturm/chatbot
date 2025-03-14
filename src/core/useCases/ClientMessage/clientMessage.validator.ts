import Validator from '../../commom/validator';

export default class ClientMessageValidator extends Validator {
  constructor(private readonly message: ReceivedMessage) {
    super();
  }

  validate(): void {
    if (this.message == null) {
      this.errors.push('invalid state');
      return;
    }

    if (this.message.text === null || this.message.text === '')
      this.errors.push('Message cannot be null');

    if (this.message.phone === null || this.message.phone === '')
      this.errors.push('Phone cannot be null');
  }
}
