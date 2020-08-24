import { Pool, QueryResultBase } from "pg";

export interface PgPoolProvider {
    provide: string,
    useValue: Pool,
}

export interface DatabaseResult extends QueryResultBase{
    rows: DbResponse;
}

export interface DbResponse {
    status : number;
    msg : string;
    d : Array<D>;
}

export interface D {
    [key: string]: any;
}