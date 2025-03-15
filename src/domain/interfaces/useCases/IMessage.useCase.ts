export default interface IMessageUseCase<T> {
    execute(message: T) : any;
} 