import { MinLength, MaxLength, IsString, Matches } from 'class-validator';
import strings from '../strings';

export class Passw {

    @IsString({
        message:strings.e_is_string
    })
    @MinLength(8, {
        message:strings.e_min_length + 8
    })
    @MaxLength(100,  {
        message:strings.e_max_length + 100
    })
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, //at least 1 upper case letter, at least 1 lower case letter, at least 1 number or special character
        {message: strings.e_weak_passw}
    ) 
    newPassw: string;
}