export default abstract class Validator {
  protected errors: string[] = [];
  protected validated: boolean = false;

  abstract validate(): void;

  isValid(): boolean {
    if (!this.validated) this.validate();
    this.validated = true;
    return !(this.errors.length > 0);
  }

  getErrors(): string[] {
    return [...this.errors];
  }
}
