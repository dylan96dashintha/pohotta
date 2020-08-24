import { MaxLength, IsNotEmpty, IsPositive, IsOptional, Max, Min, IsDateString, IsIn } from 'class-validator';
import strings from '../../common/class-validator-strings';

export class CreateTransactionDto {
    
    @IsNotEmpty({
        message:strings.IsNotEmpty
    })
    @MaxLength(100,  {
        message:strings.MaxLength + 100
    })
    description: string;
    
    @Min(1)
    @Max(5)
    @IsPositive({
        message:strings.IsPositive
    })
    transaction_type_id: number;

    @IsPositive({
        message:strings.IsPositive
    })
    amount: number;
    
    @IsDateString({
        message:strings.IsDateString
    })
    date: number;
    
    @IsPositive({
        message:strings.IsPositive
    })
    cust_account_id: number;

    @IsOptional()
    @IsPositive({
        message:strings.IsPositive
    })
    category_id: number;

    @IsOptional()
    @IsIn(['in','out'],{
        message:strings.IsIn + 'in tai out.'
    })
    transfer_direction: string;

    @IsOptional()
    @IsPositive({
        message:strings.IsPositive
    })
    balance_account_id: number;
}