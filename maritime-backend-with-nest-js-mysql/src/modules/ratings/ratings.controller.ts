import { Controller, Post, Get, Param, UseGuards } from "@nestjs/common"
import {  RatingsService  } from './ratings.service'
import {  CreateRatingDto  } from './dto/create-rating.dto'
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"

@Controller("ratings")
export class RatingsController {
  constructor(private ratingsService: RatingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(createRatingDto: CreateRatingDto) {
    return this.ratingsService.create(createRatingDto)
  }

  @Get("user/:userId")
  async getRatings(@Param("userId") userId: string) {
    const ratings = await this.ratingsService.getRatingsForUser(userId);
    const average = await this.ratingsService.getAverageRating(userId);
    const count = await this.ratingsService.getRatingCount(userId);

    return { ratings, average, count };
  }
}
