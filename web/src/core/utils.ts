import type Op from 'quill-delta/dist/Op';
import { Note, Packet } from './types';

export function pickAndMergePacketsOps(packets: Packet[]): Op[] {
    return packets.reduce((final, { ops }) => final.concat(ops), [] as Op[]);
}

export function mergeToPackets(
    packetsA: Packet | Packet[],
    packetsB: Packet[]
): Packet[] {
    if (Array.isArray(packetsA)) {
        if (packetsA.length === 0) {
            return packetsB;
        }

        return packetsA.reduce((final, packet) => {
            return mergeToPackets(packet, final);
        }, packetsB);
    }

    if (packetsB.length === 0) {
        return [packetsA];
    }

    if (packetsB.length === 1) {
        if (packetsA.timestamp <= packetsB[0].timestamp) {
            return [packetsA, ...packetsB];
        }

        return [...packetsB, packetsA];
    }

    const centerIndex = Math.floor(packetsB.length / 2);

    if (packetsB[centerIndex].timestamp > packetsA.timestamp) {
        return mergeToPackets(packetsA, packetsB.slice(0, centerIndex)).concat(
            packetsB.slice(centerIndex)
        );
    }

    return packetsB
        .slice(0, centerIndex)
        .concat(mergeToPackets(packetsA, packetsB.slice(centerIndex)));
}

export function mergePacketsTo(
    packetsA: Packet[],
    packetsB: Packet[]
): Packet[] {
    return packetsA.reduce((final, packet) => {
        return mergeToPackets(packet, final);
    }, packetsB);
}

export function packetsToString(packets: Packet[]): string {
    return packets.reduce((result, packet) => {
        return packet.ops.reduce(
            (final, op) => {
                if (op.retain !== undefined) {
                    final.cursor += op.retain;
                    return final;
                }

                const charArr = final.txt.split('');

                if (typeof op.insert === 'string') {
                    charArr.splice(final.cursor, 0, op.insert);
                    final.cursor += op.insert.length;
                } else if (op.delete) {
                    const preDelLen = op.delete + final.cursor - charArr.length;

                    charArr.splice(final.cursor, op.delete).join('');

                    if (preDelLen > 0) {
                        charArr.splice(0, preDelLen);
                    }
                }
                final.txt = charArr.join('');
                return final;
            },
            { txt: result, cursor: 0 }
        ).txt;
    }, '');
}

export function note(): Note {
    const time = Date.now();

    return {
        createTime: time,
        top: false,
        category: '#f4f4f4',
        delete: false,
        content: [],
    };
}

export function packet(ops: Op[]): Packet {
    return {
        ops,
        timestamp: Date.now(),
    };
}

export function splitHTML(html: string): string[] {
    if (html === '') {
        return [];
    }

    const reg = /[^><]+(?=<\/[^>]+>)/gim;

    return html.match(reg) ?? [];
}

export function pickImgUrlFromHTML(html: string) {
    const imgSourceReg = /(?<=<img.*?src=('|"){1})https?:\/\/.*?\.(jpg|gif|png)(?=\1{1}.*?(>|\/>){1})/gim;

    return html.match(imgSourceReg) ?? [];
}
