import { Controller, Post, Get, Body, Param, UseGuards } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { DocumentsService } from "./documents.service"
import {  CreateDocumentDto  } from './dto/create-document.dto'

@Controller("documents")
export class DocumentsController {
  constructor(private documentsService: DocumentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.documentsService.findById(id);
  }

  @Get('listing/:listingId')
  async findByListing(@Param('listingId') listingId: string) {
    return this.documentsService.findByListing(listingId);
  }

  @Get('transaction/:transactionId')
  async findByTransaction(@Param('transactionId') transactionId: string) {
    return this.documentsService.findByTransaction(transactionId);
  }

  @Get(':id/verify')
  async verify(@Param('id') id: string) {
    return this.documentsService.verify(id);
  }

  @Post(':id/revoke')
  @UseGuards(JwtAuthGuard)
  async revoke(@Param('id') id: string) {
    return this.documentsService.revoke(id);
  }

  @Post('generate/bill-of-lading')
  @UseGuards(JwtAuthGuard)
  async generateBillOfLading(@Body() body: { transactionId: string }) {
    return this.documentsService.generateBillOfLading(body.transactionId);
  }

  @Post('generate/invoice')
  @UseGuards(JwtAuthGuard)
  async generateInvoice(@Body() body: { transactionId: string }) {
    return this.documentsService.generateInvoice(body.transactionId);
  }

  @Post('generate/packing-list')
  @UseGuards(JwtAuthGuard)
  async generatePackingList(@Body() body: { transactionId: string }) {
    return this.documentsService.generatePackingList(body.transactionId);
  }
}
