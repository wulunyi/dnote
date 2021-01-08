"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoProxy = void 0;
class IoProxy {
    constructor(gateway) {
        this.gateway = gateway;
    }
    emitAll(...args) {
        var _a;
        (_a = this.gateway.io) === null || _a === void 0 ? void 0 : _a.emit(...args);
    }
    emitSkipSocket(client, ...args) {
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
exports.IoProxy = IoProxy;
//# sourceMappingURL=io.proxy.js.map