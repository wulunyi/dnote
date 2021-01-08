import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { NoteModule } from './modules/note/note.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017', {
            dbName:
                process.env.NODE_ENV === 'production' ? 'note' : 'note-test',
        }),
        NoteModule,
    ],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
