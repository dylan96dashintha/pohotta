import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./i18n/resources"
import detectBrowserLanguage from 'detect-browser-language'

// const lng = detectBrowserLanguage();
const lng = 'en';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lng,
    fallbackLng: 'fi',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;