export default abstract class Validator {
  protected errors: string[] = [];

  abstract validate(): void;

  isValid(): boolean {
    if (this.errors.length === 0) this.validate();

    return !(this.errors.length > 0);
  }

  getErrors(): string[] {
    return [...this.errors];
  }
}
