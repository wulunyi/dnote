import io from 'socket.io-client';
import { DOMAIN } from './env';

export const getSocket = (function () {
    const client = io(`ws://${DOMAIN}:3000`, {
        transports: ['websocket', 'polling'],
    });

    client.on('connect', () => {
        console.log('Connected');
    });

    client.on('exception', (data: any) => {
        console.log('event', data);
    });

    client.on('disconnect', () => {
        console.log('Disconnected');
    });

    return () => client;
})();
