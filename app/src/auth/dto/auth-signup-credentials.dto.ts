import { IsEmail, MinLength, MaxLength, IsString, Matches } from 'class-validator';
import strings from '../../common/class-validator-strings'

export class AuthSignUpCredentialsDto {
    @IsEmail({},{
        message:strings.IsEmail
    })
    email: string;

    @IsString({
        message:strings.IsString
    })
    @MinLength(8, {
        message:strings.MinLength
    })
    @MaxLength(100,  {
        message:strings.MaxLength
    })
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, //at least 1 upper case letter, at least 1 lower case letter, at least 1 number or special character
        {message: strings.WeakPassw}
    ) 
    passw: string;
}