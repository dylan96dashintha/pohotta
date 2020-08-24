import React, { useEffect } from "react";
import {useTranslation } from 'react-i18next';
import "./Record.scss";
import { useLocation, useHistory } from "react-router-dom";
import PageHeader from "../../components/PageHeader/PageHeader";
import AssetBox from "../../components/AssetBox/AssetBox";
import CollapsableAssetBox from "../../components/CollapsableAssetBox/CollapsableAssetBox";
import FloatingRoundButton from "../../components/FloatingRoundButton/FloatingRoundButton";
import { RootState } from "../../store/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalances } from "../../store/balances/thunks";
import { BalancesState } from "../../store/balances/types";
import { formatVs } from "../../common/tools/helpers";
import {Link} from "react-router-dom";

const Record = () => {
    const { t } = useTranslation('recordPage');
    const selectBalances = (state: RootState) => state.balances.balances;
    const balances = useSelector(selectBalances);
    const history = useHistory();
    const dispatch = useDispatch();
    const location = useLocation();
    const locationArray: Array<String> = [];
    locationArray.push(location.pathname);  
    
    useEffect(() => {
        if(!balances)
            dispatch(fetchBalances());
    }, [dispatch]);

    const getTotalBoxData = (balances: BalancesState["balances"]) => {
        return {
            monthLabel: balances?.month_label ?? "",
            totalSum: (balances?.sum ?? 0),
            totalTitle: t('total') ?? "",
            differencePercent: formatVs(balances?.vs),
            differenceFrom: balances?.prev_month_label
        };

    }

    return (
        <>
             <Link className="breadcrumbs" to="/record">Record /</Link>
            <PageHeader title={t('record_page_title')} />
            <section>
                {balances !== undefined && balances.hasOwnProperty("account_types") && <AssetBox account={getTotalBoxData(balances)} />}

                <h2>{t('record_page_sub_title')}</h2>

                {balances !== undefined &&
                    balances.hasOwnProperty("account_types") &&
                    balances?.account_types?.map((accountType, index) => {
                        console.log('CollapsableAssetBox accountType', accountType)
                    return <CollapsableAssetBox data={accountType} data2={locationArray} key={"box" + index} index={index}/>;
                    })}

                <FloatingRoundButton buttonAction={() => history.push("/accountForm")} />
            </section>
        </>
    );
};
export default Record;
