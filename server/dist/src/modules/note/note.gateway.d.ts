import { Server, Socket } from 'socket.io';
import { Note, Packet } from 'src/modules/note/note.schema';
import { CreateNoteDto, EditNoteDto } from '../note/note.dto';
import { NoteService } from '../note/note.service';
export declare class NoteGateway {
    private readonly noteService;
    constructor(noteService: NoteService);
    private ioProxy;
    io: Server;
    events(data: CreateNoteDto, client: Socket): Promise<Note>;
    edit(data: EditNoteDto, client: Socket): Promise<[number, Packet[]]>;
    tagDel(data: EditNoteDto, client: Socket): Promise<Note>;
    del(data: EditNoteDto, client: Socket): Promise<string>;
}
