import { IsEmail } from 'class-validator';
import strings from '../strings';

export class EmailDto {
    @IsEmail({},{
        message:strings.e_is_email
    })
    email: string;
}