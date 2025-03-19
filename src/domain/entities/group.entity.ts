export class Group {
  constructor(
    public readonly id: string | undefined,
    public readonly name: string,
    public readonly attendeePhone: string,
    public readonly clientPhone: string,
    public readonly botPhone: string,
  ) {}

  // Exemplo de método de domínio
  isValidPhoneFormat(): boolean {
    return /^[0-9]{10,15}$/.test(this.attendeePhone);
  }
}
