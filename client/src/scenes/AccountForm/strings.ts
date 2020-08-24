import common from "../../common/tools/strings";

const strings = {
    en: {
        accountForm: {
            "account_description": "Account Name",
            "account_type": "Account Type",
            "current_balance": "Current Balance",
            "current_balance_date": "Date For Balance",
            "input_type": "Entry Type",
            "balance": "Balance",
            "expenses": "Cost",
            "add_account": "Add Account",
            "edit_account": "Edit Account",
            "save":"Save",
            "balance_mode_balance":"Balance",
            "balance_mode_cost":"Cost",
            "money":"Money",
            "investment":"Investment",
            "debt":"Debt",
            "other":"Other",
            "err_required": "Required",
            ...common.en.common,
        },
    },
    fi: {
        accountForm: {
            "account_description": "Tilin nimi",
            "account_type": "Tilityyppi",
            "current_balance": "Nykyinen saldo",
            "input_type": "Syöttötapa",
            "balance": "Saldo",
            "current_balance_date": "Saldon päivämäärä",
            "expenses": "Menot",
            "add_account": "Tilin lisääminen",
            "edit_account": "Tilin muokkaaminen",
            "save":"Tallenna",
            "balance_mode_balance":"Saldo",
            "balance_mode_cost":"Menot",
            "money":"Raha",
            "investment":"Sijoitus",
            "debt":"Velka",
            "other":"Muu Omaisuus",
            "err_required": "Pakollinen",
            ...common.fi.common,
        }
    },
};

export default strings;