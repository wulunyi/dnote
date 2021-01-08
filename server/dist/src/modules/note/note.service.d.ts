import { Model } from 'mongoose';
import { Note, NoteDocument, Packet } from './note.schema';
import { CreateNoteDto, EditNoteDto } from './note.dto';
export declare class NoteService {
    private noteModel;
    constructor(noteModel: Model<NoteDocument>);
    create(createCatDto: CreateNoteDto): Promise<Note>;
    findAll(): Promise<Note[]>;
    addPackets(data: EditNoteDto): Promise<[number, Packet[], Packet[]]>;
    diffByVersion(id: string, v: number): Promise<[number, Packet[]]>;
    tagDel(id: string): Promise<Note>;
    del(id: string): Promise<string>;
}
