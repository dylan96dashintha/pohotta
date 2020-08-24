export interface Account {
    id: number;
    description: string;
    is_balance_mode: boolean;
    account_type: AccountType;
    customer_id?: number;
};

// (1,'money',1),(2,'investment',1),(3,'debt',-1),(4,'other',1)
export enum AccountType {
    money = 1,
    investment = 2,
    debt = 3,
    other = 4,
};

export interface AccountTransactionTypes {
    value: number;
    displayValue: string;
};

export interface AccountBalance  {
    month_label: string;
    customer_id: number;
    month: string;
    m_sum: number;
    m_sum_prev_m: number;
    m_vs_m: number;
    acc_type_id: number;
    acc_type_name: string;
    acc_type_sum: number;
    acc_type_sum_prev_m: number;
    acc_type_vs_m: number;
    acc_id: number;
    acc_name: string;
    account_sum: number;
    account_sum_prev_m: number;
    acc_vs_m: number;
};