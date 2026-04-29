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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
let UploadService = class UploadService {
    constructor() {
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
            api_key: process.env.CLOUDINARY_API_KEY?.trim(),
            api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
        });
    }
    async uploadFile(file, folder) {
        const isPdf = file.mimetype === 'application/pdf';
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        const result = await cloudinary_1.v2.uploader.upload(base64, {
            folder,
            resource_type: isPdf ? 'raw' : 'image',
            ...(isPdf ? { public_id: `${uid}.pdf` } : {}),
        });
        if (!result?.secure_url) {
            throw new common_1.InternalServerErrorException('Cloudinary upload failed: no URL returned.');
        }
        return result.secure_url;
    }
};
exports.UploadService = UploadService;
exports.UploadService = UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UploadService);
//# sourceMappingURL=upload.service.js.map