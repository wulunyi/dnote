import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Note, Packet } from 'src/modules/note/note.schema';
import { IoProxy } from '../../utils/io.proxy';
import { CreateNoteDto, EditNoteDto } from '../note/note.dto';
import { NoteService } from '../note/note.service';

@WebSocketGateway({ transports: ['websocket', 'polling'] })
export class NoteGateway {
    constructor(private readonly noteService: NoteService) {
        this.ioProxy = new IoProxy(this);
    }

    private ioProxy: IoProxy;

    @WebSocketServer()
    io: Server;

    @SubscribeMessage('create')
    async events(
        @MessageBody() data: CreateNoteDto,
        @ConnectedSocket() client: Socket
    ): Promise<Note> {
        const note = await this.noteService.create({ ...data, version: 0 });

        this.ioProxy.emitSkipSocket(client, 'create', note);

        return note;
    }

    @SubscribeMessage('edit')
    async edit(
        @MessageBody() data: EditNoteDto,
        @ConnectedSocket() client: Socket
    ): Promise<[number, Packet[]]> {
        const [
            version,
            packets,
            diffPackets,
        ] = await this.noteService.addPackets(data);

        this.ioProxy.emitSkipSocket(client, 'edit', {
            id: data.id,
            version,
            packets,
        });

        return [version, diffPackets];
    }

    @SubscribeMessage('tagDel')
    async tagDel(
        @MessageBody() data: EditNoteDto,
        @ConnectedSocket() client: Socket
    ): Promise<Note> {
        const note = await this.noteService.tagDel(data.id);

        this.ioProxy.emitSkipSocket(client, 'tagDel', {
            id: data.id,
        });

        return note;
    }

    @SubscribeMessage('del')
    async del(
        @MessageBody() data: EditNoteDto,
        @ConnectedSocket() client: Socket
    ): Promise<string> {
        const id = await this.noteService.del(data.id);

        this.ioProxy.emitSkipSocket(client, 'del', {
            id,
        });

        return id;
    }
}
