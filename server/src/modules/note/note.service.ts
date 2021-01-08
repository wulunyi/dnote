import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note, NoteDocument, Packet } from './note.schema';
import { CreateNoteDto, EditNoteDto } from './note.dto';
import { mergePacketOrderByTimestamp, pickNewPackets } from './note.utils';

@Injectable()
export class NoteService {
    constructor(
        @InjectModel(Note.name) private noteModel: Model<NoteDocument>
    ) {}

    async create(createCatDto: CreateNoteDto): Promise<Note> {
        const createdCat = new this.noteModel(createCatDto);

        return await createdCat.save();
    }

    async findAll(): Promise<Note[]> {
        return await this.noteModel
            .find()
            .sort({ createTime: -1 })
            .exec();
    }

    async addPackets(data: EditNoteDto): Promise<[number, Packet[], Packet[]]> {
        const note = await this.noteModel.findById(data.id).exec();
        const difference =
            data.version < note.version
                ? pickNewPackets(note.content, data.version)
                : [];

        note.version += 1;

        const withVersionPackets = data.packets.map(packet => {
            packet.version = note.version;
            return packet;
        });

        note.content = mergePacketOrderByTimestamp(
            note.content,
            withVersionPackets
        );

        await note.save();

        return [note.version, withVersionPackets, difference];
    }

    async diffByVersion(id: string, v: number): Promise<[number, Packet[]]> {
        const { content, version } = await this.noteModel.findById(id).exec();
        const difference = version !== v ? [] : pickNewPackets(content, v);

        return [version, difference];
    }

    async tagDel(id: string): Promise<Note> {
        const note = await this.noteModel.findById(id).exec();

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        note.delete = true;

        return await note.save();
    }

    async del(id: string): Promise<string> {
        await this.noteModel
            .findById(id)
            .remove()
            .exec();

        return id;
    }
}
