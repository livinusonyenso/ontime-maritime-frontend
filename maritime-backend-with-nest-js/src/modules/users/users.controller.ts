import { Controller, Get, UseGuards, Request } from "@nestjs/common"
import { JwtAuthGuard } from "../../guards/jwt-auth.guard"
import { UsersService } from "./users.service"

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.id)
  }

  @Get()
  async getAll() {
    return this.usersService.findAll()
  }
}
