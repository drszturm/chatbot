export class Group {
  constructor(
    public id: string | undefined,
    public name: string,
    public attendeePhone: string,
    public clientPhone: string,
    public botPhone: string,
  ) {}

  // Exemplo de método de domínio
  isValidPhoneFormat(): boolean {
    return /^[0-9]{10,15}$/.test(this.attendeePhone);
  }
}
