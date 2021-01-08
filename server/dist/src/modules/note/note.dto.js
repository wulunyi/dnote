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
exports.UpdateNoteDto = exports.DelNoteDto = exports.EditNoteDto = exports.CreateNoteDto = void 0;
const class_validator_1 = require("class-validator");
class CreateNoteDto {
}
__decorate([
    class_validator_1.IsOptional(),
    __metadata("design:type", Number)
], CreateNoteDto.prototype, "version", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateNoteDto.prototype, "category", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Array)
], CreateNoteDto.prototype, "content", void 0);
exports.CreateNoteDto = CreateNoteDto;
class EditNoteDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], EditNoteDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsArray(),
    __metadata("design:type", Array)
], EditNoteDto.prototype, "packets", void 0);
__decorate([
    class_validator_1.IsNumber(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], EditNoteDto.prototype, "version", void 0);
exports.EditNoteDto = EditNoteDto;
class DelNoteDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], DelNoteDto.prototype, "id", void 0);
exports.DelNoteDto = DelNoteDto;
class UpdateNoteDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], UpdateNoteDto.prototype, "id", void 0);
__decorate([
    class_validator_1.IsString(),
    __metadata("design:type", String)
], UpdateNoteDto.prototype, "category", void 0);
__decorate([
    class_validator_1.IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateNoteDto.prototype, "top", void 0);
exports.UpdateNoteDto = UpdateNoteDto;
//# sourceMappingURL=note.dto.js.map