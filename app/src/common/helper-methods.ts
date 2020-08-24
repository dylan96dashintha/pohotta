import { D } from '../db/db.interface';
import { AccountTransactionTypes } from '../accounts/account.interface';

//returns e.g.: [{value: 1, displayValue: 'Tulo'}]
export const convertToDropdownList = (dataArray: Array<D>,valueField: string,displayValueField: string,): AccountTransactionTypes[] => {
    // console.log(valueField, displayValueField);
    const modifiedArray: Array<AccountTransactionTypes> = [];
        if (Array.isArray(dataArray)) {
            dataArray.map(row => {
                if (row && row.hasOwnProperty(valueField) && row.hasOwnProperty(displayValueField)) {
                const record: AccountTransactionTypes = {
                    value: row[valueField],
                    displayValue: row[displayValueField],
                };
                return modifiedArray.push(record);
                }
            });
        }
    return modifiedArray;
};

// check if an element with prop exists in array
export const findProp = (arr: [], prop: string, propValue: string): boolean => {
    const result: number = arr.filter(item => item[prop] === propValue).length;
    // console.log(propValue, result);
    return result !== 0 ? true : false;
};

export const sortByLabel = (data: any, selectedLabel: string) => {
    if (data && selectedLabel) {
        if (selectedLabel === 'month_label') {
            //sort decending
            data.sort((value1, value2) => {
                const a = value1[selectedLabel].split('/').reverse().join('');
                const b = value2[selectedLabel].split('/').reverse().join('');
                return a < b ? 1 : a > b ? -1 : 0;
            });
        } else {
            data.sort((value1, value2) => {
            const a = value1[selectedLabel];
            const b = value2[selectedLabel];
            return a < b ? -1 : a > b ? 1 : 0;
            });
        }
        // console.log(data);
        return data;
    }
};
