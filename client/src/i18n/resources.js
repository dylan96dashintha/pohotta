import landing from "../scenes/Landing/strings";
import auth from "../scenes/Auth/strings";
import recordPage from "../scenes/Record/strings";
import accountForm from "../scenes/AccountForm/strings";
import account from "../scenes/Account/strings";
import transactionForm from "../scenes/TransactionForm/strings";

import landingPageNav from "../components/Navigation/strings";
import targetCalculator from "../components/TargetCalculator/strings";
import collapsibleAssetBox from "../components/CollapsableAssetBox/strings";
import assetBox from "../components/AssetBox/strings";
import footerNavigation from "../components/FooterNavigation/strings";

const resources = {
    en: {
        ...landingPageNav.en,
        ...landing.en,
        ...targetCalculator.en,
        ...auth.en,
        ...recordPage.en,
        ...collapsibleAssetBox.en,
        ...assetBox.en,
        ...accountForm.en,
        ...account.en,
        ...transactionForm.en,
        ...footerNavigation.en,
    },
    fi: {
        ...landingPageNav.fi,
        ...landing.fi,
        ...targetCalculator.fi,
        ...auth.fi,
        ...recordPage.fi,
        ...collapsibleAssetBox.fi,
        ...assetBox.fi,
        ...accountForm.fi,
        ...account.fi,
        ...transactionForm.fi,
        ...footerNavigation.fi,
    },
};

export default resources;
