import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteController } from './note.controller';
import { NoteService } from './note.service';
import { NoteSchema, Note } from './note.schema';
import { NoteGateway } from './note.gateway';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    ],
    controllers: [NoteController],
    providers: [NoteService, NoteGateway],
})
export class NoteModule {}
