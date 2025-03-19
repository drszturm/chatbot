export class Attendee {
  constructor(
    public readonly id: number | undefined,
    public readonly name: string,
    public readonly attendeePhone: string,
  ) {}
}
