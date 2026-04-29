import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHello() {
    return { message: 'OnTime Maritime Backend is running' }
  }
}
