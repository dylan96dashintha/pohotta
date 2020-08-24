import { DatabaseResult, DbResponse } from './db.interface';
import { UnauthorizedException, InternalServerErrorException, ConflictException, Logger, NotFoundException, BadRequestException, MethodNotAllowedException } from '@nestjs/common';

export const handleDbResponse = (response:DatabaseResult, info:any) => {
    const logger = new Logger('DB Result Helper');
    const result = response.rows[0];
    const status = result._status;
    const message = result._msg;
    let data:[] = Array.isArray(result._d) ? result._d : [result._d];
    // console.log('handle db response', result);

    switch (status) {
        case 200:
            break //return beautiful
        case 201:
            // translatedMsg = message;
            break; //return beautiful
        case 400: // bad request
            logger.error('Info: ', info + ' Message: ' + message);
            throw new BadRequestException({message: message});
        case 401: // unauthorized
            logger.error('Info: ', info + ' Message: ' + message);
            throw new UnauthorizedException({message: message});
        case 404: // not found
            logger.error('Info: ', info + ' Message: ' + message);
            throw new NotFoundException({message: message});
        case 405: // not allowed
            logger.error('Info: ', info + ' Message: ' + message);
            throw new MethodNotAllowedException({message: message});
        case 409: // conflict = duplicate
            logger.log('Info: ', info + ' Message: ' + message);
            throw new ConflictException({message: message});
        case 500: // something went wrong
            console.log(result)
            logger.error(`Info: `, info + ' Message: ' + result._d.message + " Detail:" + result._d.detail + " Context:" + result._d.context);
            throw new InternalServerErrorException({message: message});
        default:
            throw new InternalServerErrorException({message: '(500) ' + message});
    }

    const dbResponse: DbResponse = {
        status : status,
        msg : message,
        d : data
    }
    // console.log(dbResponse)
    return dbResponse;
};
                    