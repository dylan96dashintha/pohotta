import {IsNotEmpty, IsOptional, IsPositive, Min} from 'class-validator';
import strings from '../../common/class-validator-strings'

export class CreateForecastDto {
    @IsOptional()
    @Min(0,{
        message: strings.IsPositiveGoal
    })
    goal: number | null;

    @IsNotEmpty({
        message: strings.IsNotEmpty
    })
    currentInvestments: number;

    @IsNotEmpty({
        message: strings.IsNotEmpty
    })
    @IsPositive({
        message: strings.IsPositiveIncome
    })
    monthlyIncome: number;

    @IsNotEmpty({
        message: strings.IsNotEmpty
    })
    @IsPositive({
        message: strings.IsPositiveCost
    })
    monthlyCost: number;

    @IsNotEmpty({
        message: strings.IsNotEmpty
    })
    @IsPositive({
        message: strings.IsPositiveInterest
    })
    interestRate: number;
}