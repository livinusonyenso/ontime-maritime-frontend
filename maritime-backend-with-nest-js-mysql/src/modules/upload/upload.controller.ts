import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'
import { UploadService } from './upload.service'
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'

const ALLOWED_TYPES = /^(image\/(jpeg|png|webp|gif)|application\/pdf)$/
const MAX_SIZE = 50 * 1024 * 1024 // 50 MB

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: MAX_SIZE },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_TYPES.test(file.mimetype)) {
          // Pass null + false — let the handler throw the proper NestJS exception
          return cb(null, false)
        }
        cb(null, true)
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string = 'ontime-maritime',
  ) {
    if (!file) {
      throw new BadRequestException(
        'No file provided or file type not allowed. Accepted: jpeg, png, webp, gif, pdf.',
      )
    }
    const url = await this.uploadService.uploadFile(file, folder)
    return { url }
  }
}
