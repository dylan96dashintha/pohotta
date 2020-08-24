import {ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {

        console.log(exception)

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const message = exception.message ? exception.message : "Something went wrong";
        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        //Check if it's a validation error (class-validator) or not
        if (exception.response && exception.response.message && exception.response.message.constructor === Array ) {
            // return input information with the error
            return response.status(status).json(exception.response);
        } else {
            return response.status(status).json({
                statusCode: status,
                message: message,
                timestamp: new Date().toISOString(),
                path: request.url,
            }); 
        }

        
    }
  }