import { Packet } from './note.schema';
export declare class CreateNoteDto {
    version: number;
    category: string;
    content: Packet[];
}
export declare class EditNoteDto {
    id: string;
    packets: Packet[];
    version: number;
}
export declare class DelNoteDto {
    id: string;
}
export declare class UpdateNoteDto {
    id: string;
    category: string;
    top: boolean;
}
