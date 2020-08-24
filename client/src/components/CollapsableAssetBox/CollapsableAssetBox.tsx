import React, { Fragment, useState } from "react";
import AssetBox from "../AssetBox/AssetBox";
import { formatVs } from "../../common/tools/helpers"
import { useTranslation } from 'react-i18next';
import {useDispatch, useSelector} from "react-redux";
import { setAssistBox } from "../../store/balances/thunks";
import {RootState} from "../../store/index";

function getMainBoxData(balances: any, isOpen: boolean) {
    // console.log(balances);
    return {
        totalSum: balances.sum,
        totalTitle: balances.name,
        differencePercent: formatVs(balances.vs),
        differenceFrom: balances.prev_month_label,
        padding: true,
        canOpen: true,
        isOpen,
    };
}

function getChildBoxData(balances: any) {
    return {
        totalSum: balances.sum,
        totalTitle: balances.name,
        accountId: balances.id,
        differencePercent: formatVs(balances.vs),
        differenceFrom: balances.prev_month_label,
        child: true,
        padding: true,
    };
}

const CollapsableAssetBox = (props: any) => {
    const dispatch = useDispatch();
   // const isOpenAssistBox = (state: RootState) => state.assistBox.isAssistBoxOpen;
   // const isAssistBoxOpen = useSelector(isOpenAssistBox);
   // console.log("redux-success",isAssistBoxOpen);
    const { t } = useTranslation('collapsibleAssetBox');
    let accounts = props.data;
    let location = props.data2;
    const [isOpen, setIsOpen] = useState(false);

    {console.log("beforeeeeee",isOpen)} 
    function assistBoxOpen() {
        dispatch(setAssistBox(isOpen, props.index));
    }

    return (
        <Fragment>
            {console.log("before props",props)} 
            <div onClick={() => {
                setIsOpen(!isOpen) 
                console.log('props', props)
                assistBoxOpen()
            }}>
                
                <AssetBox account={getMainBoxData(accounts, isOpen)} />
                
                
            </div>
            {accounts.hasOwnProperty("accounts") &&
                (props.data.isOpen ) &&
                accounts.accounts.map((acc: any) => {
                    return <AssetBox account={getChildBoxData(acc)} key={acc.id} />;
                })}
        </Fragment>
        
    );
};

export default CollapsableAssetBox;
