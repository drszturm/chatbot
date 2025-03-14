import Validator from "../../commom/validator";

export default class AttendeeMessageValidator extends Validator {
  constructor(private readonly message: ReceivedMessage) {
    super();
  }

  validate(): void {
    if (this.message == null) {
      this.errors.push('invalid state');
      return;
    }

    if (this.message.groupId == null || this.message.groupId === '')
      this.errors.push('GroupId cannot be empty');

    if (this.message.text === null || this.message.text === '')
      this.errors.push('Message cannot be empty');

    if (this.message.phone === null || this.message.phone === '')
      this.errors.push('Phone cannot be empty');
  }
}
