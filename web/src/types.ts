export interface ResponseWrapper<T> {
    code: number;
    message: string;
    data: T;
}
