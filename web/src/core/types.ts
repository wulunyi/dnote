import type Op from 'quill-delta/dist/Op';

export interface Packet {
    timestamp: number;
    // 只有同步后才有版本
    version?: number;
    ops: Op[];
}

export interface Note {
    _id?: string;
    id?: string;
    version?: number;
    createTime: number;
    top: boolean;
    category: string;
    delete: boolean;
    content: Packet[];
}

export interface EditEvent {
    version: number;
    id: string;
    packets: Packet[];
}
