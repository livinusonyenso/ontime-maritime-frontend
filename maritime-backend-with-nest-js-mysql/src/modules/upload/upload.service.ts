import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
      api_key: process.env.CLOUDINARY_API_KEY?.trim(),
      api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
    })
  }

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    const isPdf = file.mimetype === 'application/pdf'
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`

    // For raw (PDF) uploads Cloudinary omits the extension from the URL unless
    // we supply an explicit public_id that includes it — so we generate one.
    const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

    const result = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: isPdf ? 'raw' : 'image',
      ...(isPdf ? { public_id: `${uid}.pdf` } : {}),
    })

    if (!result?.secure_url) {
      throw new InternalServerErrorException('Cloudinary upload failed: no URL returned.')
    }

    return result.secure_url
  }
}
