import { Packet } from './note.schema';

export function pickNewPackets(packets: Packet[], version: number): Packet[] {
    return packets.reduce((news, packet) => {
        if (packet.version > version) {
            news.push(packet);
        }

        return news;
    }, [] as Packet[]);
}

export function mergePacketOrderByTimestamp(
    packetsA: Packet[],
    packetsB: Packet[]
): Packet[] {
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
