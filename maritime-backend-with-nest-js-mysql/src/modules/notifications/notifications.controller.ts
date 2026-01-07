import { Controller, Post, Get, Param, Query, UseGuards, Request } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { NotificationsService } from "./notifications.service"
import {  CreateNotificationDto  } from './dto/create-notification.dto'

@Controller("notifications")
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto)
  }

  @Get("my-notifications")
  @UseGuards(JwtAuthGuard)
  async getMyNotifications(@Request() req, @Query('skip') skip = 0, @Query('take') take = 20) {
    return this.notificationsService.findByUser(req.user.id, skip, take)
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.notificationsService.findById(id);
  }

  @Post(':id/sent')
  async markAsSent(@Param('id') id: string) {
    return this.notificationsService.markAsSent(id);
  }

  @Post(':id/failed')
  async markAsFailed(@Param('id') id: string) {
    return this.notificationsService.markAsFailed(id);
  }
}
