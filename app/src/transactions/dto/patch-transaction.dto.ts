import { MaxLength, IsNotEmpty, IsPositive, IsOptional, IsDateString, IsIn } from 'class-validator';
import strings from '../../common/class-validator-strings';

export class PatchTransactionDto {
   
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

    @IsPositive({
        message:strings.IsPositive
    })
    amount: number;
    
    @IsDateString({
        message:strings.IsDateString
    })
    date: number;

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
}