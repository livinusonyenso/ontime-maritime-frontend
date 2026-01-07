import { Catch, type ArgumentsHost, HttpException, HttpStatus, Logger } from "@nestjs/common"
import { BaseExceptionFilter } from "@nestjs/core"

@Catch()
export class GlobalExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()

    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let message = "Internal server error"
    let details = {}

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      message = exception.message

      if (typeof exceptionResponse === "object") {
        details = exceptionResponse
      }
    } else if (exception instanceof Error) {
      message = exception.message
      this.logger.error("Unhandled exception:", exception)
    }

    // Log all errors except validation errors
    if (status !== HttpStatus.BAD_REQUEST) {
      this.logger.error({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message,
      })
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
