import { NoteService } from './note.service';
import { Note } from './note.schema';
export declare class NoteController {
    private readonly noteService;
    constructor(noteService: NoteService);
    all(): Promise<Note[]>;
}
