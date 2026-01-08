import { Injectable, BadRequestException } from "@nestjs/common"
import { PrismaService } from "../../prisma/prisma.service"
import { Document, DocumentType } from "@prisma/client"
import { CreateDocumentDto } from "./dto/create-document.dto"
import * as crypto from "crypto"

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  private generateHash(content: string): string {
    return crypto.createHash("sha256").update(content).digest("hex")
  }

  async create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    const qrHash = this.generateHash(createDocumentDto.file_url)

    return this.prisma.document.create({
      data: {
        ...createDocumentDto,
        qr_hash: qrHash,
      },
    })
  }

  async findById(id: string): Promise<Document | null> {
    return this.prisma.document.findUnique({
      where: { id },
      include: {
        listing: true,
        transaction: true,
      },
    })
  }

  async findByListing(listingId: string): Promise<Document[]> {
    return this.prisma.document.findMany({
      where: { listing_id: listingId },
    })
  }

  async findByTransaction(transactionId: string): Promise<Document[]> {
    return this.prisma.document.findMany({
      where: { transaction_id: transactionId },
    })
  }

  async verify(id: string): Promise<{ valid: boolean; document: Document }> {
    const document = await this.findById(id)

    if (!document) {
      throw new BadRequestException("Document not found")
    }

    return {
      valid: !document.is_revoked,
      document,
    }
  }

  async revoke(id: string): Promise<Document> {
    const document = await this.findById(id)

    if (!document) {
      throw new BadRequestException("Document not found")
    }

    return this.prisma.document.update({
      where: { id },
      data: { is_revoked: true },
    })
  }

  async generateBillOfLading(transactionId: string): Promise<Document> {
    const document = await this.create({
      type: 'bill_of_lading' as DocumentType,
      transaction_id: transactionId,
      listing_id: null, // Not associated with a listing directly
      file_url: `https://ontime-maritime.s3.amazonaws.com/documents/bl-${transactionId}.pdf`,
    })

    return document
  }

  async generateInvoice(transactionId: string): Promise<Document> {
    const document = await this.create({
      type: 'invoice' as DocumentType,
      transaction_id: transactionId,
      listing_id: null,
      file_url: `https://ontime-maritime.s3.amazonaws.com/documents/invoice-${transactionId}.pdf`,
    })

    return document
  }

  async generatePackingList(transactionId: string): Promise<Document> {
    const document = await this.create({
      type: 'packing_list' as DocumentType,
      transaction_id: transactionId,
      listing_id: null,
      file_url: `https://ontime-maritime.s3.amazonaws.com/documents/packing-${transactionId}.pdf`,
    })

    return document
  }
}
