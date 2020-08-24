import { IsNotEmpty } from 'class-validator';
import strings from '../../common/class-validator-strings'

export class AuthSignInCredentialsDto {
    @IsNotEmpty({
        message:strings.IsNotEmpty
    })
    email: string;

    @IsNotEmpty({
        message:strings.IsNotEmpty
    })
    passw: string;
}