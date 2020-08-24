import {IsEmail, IsOptional ,IsAlphanumeric, IsNotEmpty} from 'class-validator';

export class JoinInviteListDto {

    @IsEmail({},{
        message: 'IsEmail'
    })
    email : string;

    @IsNotEmpty({
        message: 'IsNotEmpty'
    })
    subscription : string;

    @IsNotEmpty({
        message: 'IsNotEmpty'
    })
    important : string;

    @IsOptional()
    issue : string;

    @IsOptional()
    solution : string;
}