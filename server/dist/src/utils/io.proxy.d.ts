import { Server, Socket } from 'socket.io';
declare type EmitParams = Parameters<Server['emit']>;
export declare class IoProxy {
    private gateway;
    constructor(gateway: {
        io: Server;
    });
    emitAll(...args: EmitParams): void;
    emitSkipSocket(client: Socket, ...args: EmitParams): void;
}
export {};
