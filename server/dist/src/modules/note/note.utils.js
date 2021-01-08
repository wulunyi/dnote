"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergePacketOrderByTimestamp = exports.pickNewPackets = void 0;
function pickNewPackets(packets, version) {
    return packets.reduce((news, packet) => {
        if (packet.version > version) {
            news.push(packet);
        }
        return news;
    }, []);
}
exports.pickNewPackets = pickNewPackets;
function mergePacketOrderByTimestamp(packetsA, packetsB) {
    const result = packetsA.slice(0);
    packetsB.forEach(packet => {
        let index = result.length;
        while (index--) {
            const item = result[index];
            if (item.timestamp <= packet.timestamp) {
                break;
            }
        }
        result.splice(index, 0, packet);
    });
    return result;
}
exports.mergePacketOrderByTimestamp = mergePacketOrderByTimestamp;
//# sourceMappingURL=note.utils.js.map