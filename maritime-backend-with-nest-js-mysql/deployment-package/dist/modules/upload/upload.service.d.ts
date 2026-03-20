export declare class UploadService {
    constructor();
    uploadFile(file: Express.Multer.File, folder: string): Promise<string>;
}
