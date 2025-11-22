import { Controller, Get, Post, Param, Query, UseGuards, Request } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { TransactionsService } from "./transactions.service"
import { CreateTransactionDto } from "./dto/create-transaction.dto"

@Controller("transactions")
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Query('skip') skip = 0, @Query('take') take = 20) {
    return this.transactionsService.findAll(skip, take)
  }

  @Get("my-purchases")
  @UseGuards(JwtAuthGuard)
  async getMyPurchases(@Request() req, @Query('skip') skip = 0, @Query('take') take = 20) {
    return this.transactionsService.findByBuyer(req.user.id, skip, take)
  }

  @Get("my-sales")
  @UseGuards(JwtAuthGuard)
  async getMySales(@Request() req, @Query('skip') skip = 0, @Query('take') take = 20) {
    return this.transactionsService.findBySeller(req.user.id, skip, take)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.transactionsService.findById(id);
  }
}
