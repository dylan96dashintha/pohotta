import { MaxLength, IsBooleanString, IsNotEmpty, IsPositive, IsOptional, IsDateString, IsNumber } from 'class-validator';
import strings from '../../common/class-validator-strings';

export class CreateAccountWithBalanceDto {
   
    @IsOptional()
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

    @IsPositive({
        message:strings.IsPositive
    })
    account_type_id: number;

    @IsDateString({
        message:strings.IsDateString
    })
    date: number;

    @IsNumber({},{
        message:strings.IsPositive
    })
    balance: number;
}