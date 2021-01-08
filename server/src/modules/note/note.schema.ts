import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type NoteDocument = Note & mongoose.Document;
export type Op = { insert: string } | { retain: number } | { delete: number };
export interface Packet {
    version: number;
    timestamp: number;
    ops: Op[];
}

@Schema({
    timestamps: {
        createdAt: 'createTime',
        updatedAt: 'updateTime',
    },
})
export class Note {
    @Prop({ type: Number, required: true })
    version: number;

    @Prop({ type: String, required: true })
    category: string;

    @Prop({ type: Boolean, default: false, required: false })
    top: boolean;

    @Prop({ type: Boolean, default: false, required: false })
    delete: boolean;

    @Prop([
        raw({
            version: Number,
            timestamp: Number,
            ops: [
                raw({
                    insert: { type: String, required: false },
                    retain: { type: Number, required: false },
                    delete: { type: Number, required: false },
                }),
            ],
        }),
    ])
    content: Packet[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
