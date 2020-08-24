export interface Member {
    id: number;
    email: string;
    email_verified: boolean;
    passw: string;
    salt: string;
    is_blocked: boolean;
    customer_id: number;
    created_on: Date;
    updated_on: Date;
};