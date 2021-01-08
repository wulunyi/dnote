import { Server, Socket } from 'socket.io';

type EmitParams = Parameters<Server['emit']>;

export class IoProxy {
    constructor(private gateway: { io: Server }) {}

    emitAll(...args: EmitParams): void {
        this.gateway.io?.emit(...args);
    }

    emitSkipSocket(client: Socket, ...args: EmitParams): void {
        if (!this.gateway.io) {
            return;
        }

        const clients = this.gateway.io.clients().sockets;

        Object.entries(clients).forEach(([id, socket]) => {
            if (id !== client.id) {
                socket.emit(...args);
            }
        });
    }
}
