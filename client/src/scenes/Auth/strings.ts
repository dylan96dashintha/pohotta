import common from "../../common/tools/strings";

const strings = {
    en: {
        auth: {
            "sign_in": "Sign In",
            "account": "Email",
            "account_placeholder": "Email",
            "password":"Password",
            "password_placeholder":"Password",
            "register": "Register",
            "reset_password": "Reset password",
            "forgot_password": "Password forgotten?",
            "err_required": "Required",
            "err_email": "Email is not valid",
            "register_title": "No account?",
            "signin_title": "Have you registered already?",
            ...common.en.common,
        },
    },
    fi: {
        auth: {
            "sign_in": "Kirjaudu",
            "account": "Sähköposti",
            "account_placeholder": "Sähköposti",
            "password":"Salasana",
            "password_placeholder":"Salasana",
            "register": "Rekisteröidy",
            "reset_password": "Vaihda salasana",
            "forgot_password": "Unohtuiko salasana?",
            "err_required": "Pakollinen",
            "err_email": "Sähköposti ei validi",
            "register_title": "Ei tiliä vielä?",
            "signin_title": "Oletko jo rekisteröitynyt?",
            ...common.fi.common,
        }
    },
};

export default strings;

