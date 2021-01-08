"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const note_schema_1 = require("./note.schema");
const io_proxy_1 = require("../../utils/io.proxy");
const note_dto_1 = require("../note/note.dto");
const note_service_1 = require("../note/note.service");
let NoteGateway = class NoteGateway {
    constructor(noteService) {
        this.noteService = noteService;
        this.ioProxy = new io_proxy_1.IoProxy(this);
    }
    async events(data, client) {
        const note = await this.noteService.create(Object.assign(Object.assign({}, data), { version: 0 }));
        this.ioProxy.emitSkipSocket(client, 'create', note);
        return note;
    }
    async edit(data, client) {
        const [version, packets, diffPackets,] = await this.noteService.addPackets(data);
        this.ioProxy.emitSkipSocket(client, 'edit', {
            id: data.id,
            version,
            packets,
        });
        return [version, diffPackets];
    }
    async tagDel(data, client) {
        const note = await this.noteService.tagDel(data.id);
        this.ioProxy.emitSkipSocket(client, 'tagDel', {
            id: data.id,
        });
        return note;
    }
    async del(data, client) {
        const id = await this.noteService.del(data.id);
        this.ioProxy.emitSkipSocket(client, 'del', {
            id,
        });
        return id;
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], NoteGateway.prototype, "io", void 0);
__decorate([
    websockets_1.SubscribeMessage('create'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_dto_1.CreateNoteDto, Object]),
    __metadata("design:returntype", Promise)
], NoteGateway.prototype, "events", null);
__decorate([
    websockets_1.SubscribeMessage('edit'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_dto_1.EditNoteDto, Object]),
    __metadata("design:returntype", Promise)
], NoteGateway.prototype, "edit", null);
__decorate([
    websockets_1.SubscribeMessage('tagDel'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_dto_1.EditNoteDto, Object]),
    __metadata("design:returntype", Promise)
], NoteGateway.prototype, "tagDel", null);
__decorate([
    websockets_1.SubscribeMessage('del'),
    __param(0, websockets_1.MessageBody()),
    __param(1, websockets_1.ConnectedSocket()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [note_dto_1.EditNoteDto, Object]),
    __metadata("design:returntype", Promise)
], NoteGateway.prototype, "del", null);
NoteGateway = __decorate([
    websockets_1.WebSocketGateway({ transports: ['websocket', 'polling'] }),
    __metadata("design:paramtypes", [note_service_1.NoteService])
], NoteGateway);
exports.NoteGateway = NoteGateway;
//# sourceMappingURL=note.gateway.js.map