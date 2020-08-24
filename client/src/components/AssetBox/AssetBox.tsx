import React from "react";
import "./AssetBox.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';


interface AssetBoxData {
    account: {
        totalSum: number;
        totalTitle: string;
        accountId?: number;
        differencePercent?: number;
        differenceFrom?: string;
        child?: boolean;
        canOpen?: boolean;
        isOpen?: boolean;
        padding?: boolean;
    };
}

function formatSum(sum: number) {
    return new Intl.NumberFormat("fi-FI", { style: "currency", currency: "EUR" }).format(sum);
}

const AssetBox = (props: AssetBoxData) => {
    const { t } = useTranslation('assetBox');
    const history = useHistory();
    let margin = props.account.padding ? "margin" : "";
    if (props.account.child) {
        margin = "margin-child";
    }
    let boxClass = "asset-box " + margin;

    function d() {
        console.log("props",props.account.child);
        return props.account.child;
     
    }

    return (
        <div className={boxClass} onClick={() => d() && history.push(`/account/${props.account.accountId}`)}>
            <div className="column">
                <label className="sum">{`${formatSum(props.account.totalSum)}`}</label>
                <label className="small">{t(props.account.totalTitle)}</label>
            </div>
            <div className="row">
                <div className="column">
                    {props.account && typeof props.account?.differencePercent === "number" && (
                        <label className="percentage">{`+ ${props.account.differencePercent}%`}</label>
                    )}
                    {props.account?.differenceFrom && (
                        <label className="small">{`${t('from')} ${props.account.differenceFrom}`}</label>
                    )}
                </div>
                {props.account.canOpen && (
                    <FontAwesomeIcon icon={props.account.isOpen ? faCaretUp : faCaretDown} style={{ color: "white", marginLeft: "30px" }}></FontAwesomeIcon>
                )}
            </div>
        </div>
    );
};

export default AssetBox;
