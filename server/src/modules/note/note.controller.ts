import { Controller, Get } from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from './note.schema';

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Get('all')
    async all(): Promise<Note[]> {
        return (await this.noteService.findAll()).map(item => {
            item.content = item.content.sort(
                (a, b) => a.timestamp - b.timestamp
            );

            return item;
        });
    }
}
