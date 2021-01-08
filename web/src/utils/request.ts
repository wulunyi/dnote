/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { DOMAIN } from './env';

export interface ResponseWrapper<T> {
    code: number;
    message: string;
    data: T;
}

declare module 'axios' {
    export interface AxiosInstance {
        get<R = any>(
            url: string,
            config?: AxiosRequestConfig
        ): Promise<ResponseWrapper<R>>;
        post<R = any>(
            url: string,
            data?: any,
            config?: AxiosRequestConfig
        ): Promise<ResponseWrapper<R>>;
    }
}

export const request = axios.create({
    baseURL: `http://${DOMAIN}:3000`,
    timeout: 1000,
});

request.interceptors.response.use(response => {
    if ([200, 201].includes(response.status) && response.data.code === 0) {
        return response.data;
    }

    throw new Error('请求失败');
});
