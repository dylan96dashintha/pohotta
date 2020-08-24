import common from "../../common/tools/strings";

const strings = {
    en: {
        transactionForm: {
            "transaction_description_label": "Description",
            "transaction_type_label": "Transaction Type",
            "amount_label": "Amount",
            "input_type_label": "Input Type",
            "balance": "Balance",
            "expenses": "Cost",
            "date_label": "Date",
            "new_transaction": "Add Transaction",
            "edit_transaction": "Edit Transaction",
            "save": "Save",
            "err_required":"Required",
            "income":"Income",
            "transfer":"Internal Transfer",
            "direction_in":"In",
            "direction_out":"Out",
            ...common.en.common,
        },
    },
    fi: {
        transactionForm: {
            "transaction_description_label": "Kuvaus",
            "transaction_type_label": "Tilitapahtuman tyyppi",
            "amount_label": "Summa",
            "input_type_label": "Syöttötapa",
            "balance": "Saldo",
            "expenses": "Menot",
            "date_label": "Päivä",
            "new_transaction": "Lisää tapahtuma",
            "edit_transaction": "Muokkaa tapahtuaa",
            "save": "Tallenna",
            "err_required":"Pakollinen",
            "income":"Tulo",
            "transfer":"Sisäinen siirto",
            "direction_in":"Saapuva",
            "direction_out":"Lähtevä",
            ...common.fi.common,
        }
    },
};

export default strings;