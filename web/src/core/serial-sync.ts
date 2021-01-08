import { lock } from '../utils/func';
import { getSocket } from '../utils/socket';

export type EmitParams = Parameters<SocketIOClient.Socket['emit']>;

export type Task = (() => EmitParams) | EmitParams;

export class SerialSync {
    private taskQueue: Task[] = [];

    socket = getSocket();

    private sync = lock(async () => {
        while (this.taskQueue.length) {
            const task = this.taskQueue.shift()!;

            try {
                console.log('同步开始');
                await this.emit(task);
            } catch {
                this.taskQueue.unshift(task);
                console.log('同步失败');
                break;
            } finally {
                console.log('同步结束');
            }
        }

        if (this.taskQueue.length !== 0) {
            // 失败后 1s 重试
            setTimeout(() => {
                this.sync();
            }, 1000);
        }
    });

    private emit(event: Task) {
        return new Promise<unknown>((resolve, reject) => {
            if (typeof event === 'function') {
                event = event();
            }

            let callback = resolve;

            if (typeof event[event.length - 1] === 'function') {
                const cb = event.pop();

                callback = data => {
                    cb(data);

                    resolve(data);
                };
            }

            this.socket.emit(...event, callback).once('exception', reject);
        });
    }

    syncTask(task: Task) {
        this.taskQueue.push(task);
        this.sync();
    }
}
