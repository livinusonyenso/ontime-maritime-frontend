import { Controller, Post, Get, Patch, Delete, Body, Param, Query, UseGuards, Request } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { ListingsService } from "./listings.service"
import {  CreateListingDto  } from './dto/create-listing.dto'
import {  UpdateListingDto  } from './dto/update-listing.dto'

@Controller("listings")
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createListingDto: CreateListingDto, @Request() req) {
    return this.listingsService.create(createListingDto, req.user.id)
  }

  @Get()
  async findAll(@Query('skip') skip = 0, @Query('take') take = 20) {
    return this.listingsService.findAll(skip, take)
  }

  @Get("search")
  async search(@Query('q') query: string, @Query('skip') skip = 0, @Query('take') take = 20) {
    return this.listingsService.search(query, skip, take)
  }

  @Get("category/:category")
  async findByCategory(@Param('category') category: string, @Query('skip') skip = 0, @Query('take') take = 20) {
    return this.listingsService.findByCategory(category as any, skip, take)
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async findMySeller(@Request() req) {
    return this.listingsService.findMySeller(req.user.id)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.listingsService.findById(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(id, updateListingDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string) {
    await this.listingsService.delete(id);
    return { message: 'Listing deleted successfully' };
  }
}
