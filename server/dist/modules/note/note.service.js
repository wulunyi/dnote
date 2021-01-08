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
exports.NoteService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const note_schema_1 = require("./note.schema");
const note_utils_1 = require("./note.utils");
let NoteService = class NoteService {
    constructor(noteModel) {
        this.noteModel = noteModel;
    }
    async create(createCatDto) {
        const createdCat = new this.noteModel(createCatDto);
        return await createdCat.save();
    }
    async findAll() {
        return await this.noteModel
            .find()
            .sort({ createTime: -1 })
            .exec();
    }
    async addPackets(data) {
        const note = await this.noteModel.findById(data.id).exec();
        const difference = data.version < note.version
            ? note_utils_1.pickNewPackets(note.content, data.version)
            : [];
        note.version += 1;
        const withVersionPackets = data.packets.map(packet => {
            packet.version = note.version;
            return packet;
        });
        note.content = note_utils_1.mergePacketOrderByTimestamp(note.content, withVersionPackets);
        await note.save();
        return [note.version, withVersionPackets, difference];
    }
    async diffByVersion(id, v) {
        const { content, version } = await this.noteModel.findById(id).exec();
        const difference = version !== v ? [] : note_utils_1.pickNewPackets(content, v);
        return [version, difference];
    }
    async tagDel(id) {
        const note = await this.noteModel.findById(id).exec();
        note.delete = true;
        return await note.save();
    }
    async del(id) {
        await this.noteModel
            .findById(id)
            .remove()
            .exec();
        return id;
    }
};
NoteService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel(note_schema_1.Note.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], NoteService);
exports.NoteService = NoteService;
//# sourceMappingURL=note.service.js.map