export interface TransactionFormValues {
    transaction_type_id: number,
    description: string,
    amount: number | undefined,
    date: string,
    balance_account_id: number | undefined,
    transfer_direction: boolean,
}