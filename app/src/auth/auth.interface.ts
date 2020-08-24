
export interface JwtPayload {
    email: string;
};

export interface JwtResponse {
    member_id?: number;
    accessToken: string;
    iat:number;
    exp:number;
};

export interface EmailToken {
    [key: string]: any;
};