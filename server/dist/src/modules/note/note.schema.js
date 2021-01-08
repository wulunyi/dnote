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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteSchema = exports.Note = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Note = class Note {
};
__decorate([
    mongoose_1.Prop({ type: Number, required: true }),
    __metadata("design:type", Number)
], Note.prototype, "version", void 0);
__decorate([
    mongoose_1.Prop({ type: String, required: true }),
    __metadata("design:type", String)
], Note.prototype, "category", void 0);
__decorate([
    mongoose_1.Prop({ type: Boolean, default: false, required: false }),
    __metadata("design:type", Boolean)
], Note.prototype, "top", void 0);
__decorate([
    mongoose_1.Prop({ type: Boolean, default: false, required: false }),
    __metadata("design:type", Boolean)
], Note.prototype, "delete", void 0);
__decorate([
    mongoose_1.Prop([
        mongoose_1.raw({
            version: Number,
            timestamp: Number,
            ops: [
                mongoose_1.raw({
                    insert: { type: String, required: false },
                    retain: { type: Number, required: false },
                    delete: { type: Number, required: false },
                }),
            ],
        }),
    ]),
    __metadata("design:type", Array)
], Note.prototype, "content", void 0);
Note = __decorate([
    mongoose_1.Schema({
        timestamps: {
            createdAt: 'createTime',
            updatedAt: 'updateTime',
        },
    })
], Note);
exports.Note = Note;
exports.NoteSchema = mongoose_1.SchemaFactory.createForClass(Note);
//# sourceMappingURL=note.schema.js.map