import { Packet } from './note.schema';
export declare function pickNewPackets(packets: Packet[], version: number): Packet[];
export declare function mergePacketOrderByTimestamp(packetsA: Packet[], packetsB: Packet[]): Packet[];
