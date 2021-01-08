import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsArray,
    IsNumber,
    IsBoolean,
} from 'class-validator';
import { Packet } from './note.schema';

export class CreateNoteDto {
    @IsOptional()
    version: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsArray()
    @IsNotEmpty()
    content: Packet[];
}

export class EditNoteDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsArray()
    packets: Packet[];

    @IsNumber()
    @IsNotEmpty()
    version: number;
}

export class DelNoteDto {
    @IsString()
    @IsNotEmpty()
    id: string;
}

export class UpdateNoteDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    category: string;

    @IsBoolean()
    top: boolean;
}
