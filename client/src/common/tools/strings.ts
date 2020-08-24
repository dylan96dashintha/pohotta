const strings = {
    en: {
        common: {
            // Target calculator
            "IsPositiveGoal":"Target must be empty, 0 or a positive number.",
            "IsPositiveIncome":"Income must be a positive number.",
            "IsPositiveCost":"Expenses must be a positive number.",
            "IsPositiveInterest":"Interest rate must be a positive number.",
            // Class Validator
            "IsNotEmpty":"Required.",
            "IsString":"Required.",
            "IsBooleanString":"Only allowed values are 'true' or 'false'.",
            "IsEmail":"Something wrong with the email.",
            "IsAlphanumeric":"Only numbers and letters are allowed.",
            "MinLength":"Must have at least 8 characters.",
            "MaxLength":"Can have max 100 characters.",
            "WeakPassw":"Password is way too easy! Use capital letter, small letter and a special sign to get started.",
            "IsPositive":"Only positive values allowed.",
            "IsDateString":"False date.",
            "IsIn":"Allowed values are ",
            // Form errors
            "e_numeric_pos":"Insert positive number.",
            "e_numeric":"Insert a number.",
            "e_not_negative":"Only positive numbers allowed.",
            "e_string":"Required.",
            "e_email_format":"Email is not valid.",
            // Transactions API
            // Success
            "s_get_acc_trans_with_balance":"Account transaction succesfully fetched.",
            "s_transaction_created":"Transaction created",
            "s_transaction_updated":"Transaction updated.",
            "s_transaction_deleted":"Transaction deleted",
            // Error
            "e_acc_transactions_with_balance_not_found":"Account or transaction for the account not found.",
            "e_cost_must_be_negative":"First input income and internal transfers and then cost is automatically calculated from balance. It would seem that costs is positive but that is not possible.",
            "e_account_or_balance_account_not_found":"Account or balance account for the transfer is not found.",
            "e_not_possible_to_update_using_balance":"It's not possible to update transaction using balance",
            "e_transaction_not_found":"Transaction not found.",
            "e_no_transactions_not_found_for_account":"Transactions for the account were not found.",
            "e_not_allowed_balance_delete":"It's not possible to delete balance, but you can edit the balance or remove the whole account.",
            //Accounts API
            //Success
            "s_accounts_get":"Successfully fetched accounts.",
            "s_accounts_get_one":"Successfully fetched account.",
            "s_account_created":"Successfully created account.",
            "s_account_with_balance_created":"Successfully created account.",
            "s_accounts_delete":"Successfully deleted account.",
            "s_account_types_get":"Successfully fetched account types.",
            "s_get_accounts_transaction_types":"Successfully fetched transaction types for the account.",
            "s_get_all_account_balances":"Successfully fetched balances for all accounts.",
            //Error
            "e_account_found":"Account not found.",
            "e_no_accounts_found":"No accounts were found.",
            "e_account_exists":"This account already exists, try a different name.",
            "e_account_not_found":"Account not found.",
            "e_all_account_balances_not_found":"Unable to fetch balances.",
            "e_account_has_transactions":"You must delete transactions before deleting an account.",
            //Auth API
            //Success
            "s_created_member":"Welcome!",
            "s_member_found":"Welcome back!",
            "s_email_verified":"Email verified.",
            "s_passw_changed":"Password changed. You can now use it to log in.",
            //Error
            "e_member_exists":"Email exists already.",
            "e_unauthorized":"Wrong email or password.",
            "e_member_not_found":"Wrong email or password.",
            "e_change_passw":"Wou! You did remember your password. Sorry, but now you have no option but to change it.",
            //Error 500 API
            "e_500": "Uups... something went wrong.",

        },
    },
    fi: {
        common: {
            //Target calculator
            "IsPositiveGoal":"Tavoitteen pitää tyhjä, 0 tai positiivinen luku.",
            "IsPositiveIncome":"Tulojen pitää olla positiivinen luku.",
            "IsPositiveCost":"Menot pitää ilmoittaa positiivisena lukuna.",
            "IsPositiveInterest":"Korkoprosentin pitää olla positiivinen luku.",
            // Class Validator
            "IsNotEmpty":"Pakollinen tieto.",
            "IsString":"Pakollinen tieto.",
            "IsBooleanString":"Arvoksi hyväksytään 'true' tai 'false'.",
            "IsEmail":"Sähköpostissasi on jotain vikaa.",
            "IsAlphanumeric":"Vain numerot ja kirjaimet ovat sallittuja.",
            "MinLength":"Pitää sisältää vähintään 8 merkkiä.",
            "MaxLength":"Saa sisältää enintään 100 merkkiä.",
            "WeakPassw":"Tallennat palveluun taloutesi salat, joten laita vaikeampi salasana. Laita iso, pieni ja erikoismerkki, niin pääset hyvään alkuun!",
            "IsPositive":"Syötä positiivinen luku.",
            "IsDateString":"Virheellinen päivämäärä.",
            "IsIn":"Arvoksi kelpaa vain ",
            // Form errors
            "e_numeric_pos":"Syötä positiivinen luku",
            "e_numeric":"Syötä luku",
            "e_not_negative":"Ei voi olla negatiivinen luku",
            "e_string":"Tieto puuttuu",
            "e_email_format":"Sähköposti ei validi",
            // Transactions API
            // Success
            "s_get_acc_trans_with_balance":"Tilitapahtumien haku onnistui.",
            "s_transaction_created":"Tilitapahtuma luotu.",
            "s_transaction_updated":"Tilitapahtuma päivitetty.",
            "s_transaction_deleted":"Tilitapahtuma poistettu.",
            // Error
            "e_acc_transactions_with_balance_not_found":"Tiliä tai tilitapahtumia ei löydy.",
            "e_cost_must_be_negative":"Syötä ensin tulot ja siirrot, jotta menot voidaan laskea. Menot eivät voi olla positiivinen luku ja nyt näyttää juuri siltä.",
            "e_account_or_balance_account_not_found":"Tili tai siirtotili on virheellinen.",
            "e_not_possible_to_update_using_balance":"Tapahtuman päivittäminen saldolaskennalla ei ole mahdollista.",
            "e_transaction_not_found":"Tilitapahtumaa ei löydy.",
            "e_no_transactions_not_found_for_account":"Tilille ei löytynyt tapahtumia.",
            "e_not_allowed_balance_delete":"Saldoa ei voi poistaa, mutta voit muokata saldoa tai poistaa tilin.",
            //Accounts API
            //Success
            "s_accounts_get":"Tilien haku onnistui.",
            "s_accounts_get_one":"Tilin haku onnistui.",
            "s_account_created":"Tilin luominen onnistui.",
            "s_account_with_balance_created":"Tilin luominen onnistui.",
            "s_accounts_delete":"Tilin poistaminen onnistui.",
            "s_account_types_get":"Tilityyppien nouto onnistui.",
            "s_get_accounts_transaction_types":"Tilin tapahtumatyyppien nouto onnistui.",
            "s_get_all_account_balances":"Tilien saldojen nouto onnistui.",
            //Error
            "e_account_found":"Tiliä ei löytynyt.",
            "e_no_accounts_found":"Yhtään tiliä ei löytynyt.",
            "e_account_exists":"Tili on jo olemassa, anna uusi nimi.",
            "e_account_not_found":"Tiliä ei löydy.",
            "e_all_account_balances_not_found":"Saldoja ei voida hakea.",
            "e_account_has_transactions":"Poista ensin tilin tapahtumat ja vasta sen jälkeen tili.",
            //Auth API
            //Success
            "s_created_member":"Tervetuloa mukaan!",
            "s_member_found":"Tervetuloa takaisin!",
            "s_email_verified":"Sähköposti vahvistettiin.",
            "s_passw_changed":"Salasana vaihdettu. Voit nyt kirjautua uudella salasanallasi.",
            //Error
            "e_member_exists":"Sähköposti on jo rekisteröity.",
            "e_unauthorized":"Virheellinen sähköposti tai salasana.",
            "e_member_not_found":"Virheellinen sähköposti tai salasana.",
            "e_change_passw":"Vau! Muistit sittenkin salasanasi, mutta nyt joudut vaihtamaan sen.",
            //Error 500 API
            "e_500": "Ou nou... jotain meni valitettavasti pieleen.",
        }
    },
};

export default strings;