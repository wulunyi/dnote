import * as mongoose from 'mongoose';
export declare type NoteDocument = Note & mongoose.Document;
export declare type Op = {
    insert: string;
} | {
    retain: number;
} | {
    delete: number;
};
export interface Packet {
    version: number;
    timestamp: number;
    ops: Op[];
}
export declare class Note {
    version: number;
    category: string;
    top: boolean;
    delete: boolean;
    content: Packet[];
}
export declare const NoteSchema: mongoose.Schema<any, mongoose.Model<any>>;
