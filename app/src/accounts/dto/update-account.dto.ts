import { MaxLength, IsBooleanString, IsNotEmpty, IsPositive } from 'class-validator';
import strings from '../../common/class-validator-strings';

export class UpdateAccountDto {
   
    @IsPositive({
        message:strings.IsPositive
    })
    id: number;
    
    @IsNotEmpty({
        message:strings.IsNotEmpty
    })
    @MaxLength(100,  {
        message:strings.MaxLength + 100
    })
    description: string;

    @IsBooleanString({
        message:strings.IsBooleanString
    })
    is_balance_mode: string;
}