import moment from "moment";
import { FormValues } from '../../components/TargetCalculator/ITargetCalculator'
import { JoinInviteList } from '../../components/Invite/model'

const validate = (values: FormValues | JoinInviteList) => {
    const errors: any = {};
    const isPositive = ["monthlyIncome", "monthlyCost", "interestRate"];
    const isPositiveNegativeZero = ["currentInvestments"];
    const isPositiveZeroNull = ["goal"]
    const isString = ["email", "subscription", "important", "issue", "solution"];
    for (let [key, value] of Object.entries(values)) {


        if (isPositive.includes(key) ) {
            // mark error if input is not positive number
            if ( !isNumber(value) || (typeof value === "number" && numberSign(value) !== 1) ) {
                errors[key] = 'e_numeric_pos';
            }
        }

        if (isPositiveNegativeZero.includes(key) ) {
            // mark error if input is not number
            if ( !isNumber(value) || (typeof value === "number" && numberSign(value) > 1 && numberSign(value) < -1) ) {
                errors[key] = 'e_numeric';
            }
        }

        if (isPositiveZeroNull.includes(key)) {
            // mark error if input is not positve number, undefined or empty
            if ( (typeof value === "number" && numberSign(value) !== 1 && numberSign(value) !== 0) || (typeof value !== "number" && value !== undefined && value !=="") ) {
                errors[key] = 'e_not_negative';
            }
        }

        if (isString.includes(key)) {
            //mark error if input is not string
            if (!(typeof value === "string")) {
                errors[key] = 'e_string';
            }

            if ( typeof value === "string") {
                if ( (key === "email" && value.length < 1)  || (key === "subscription" && value.length < 1) || (key === "important" && value.length < 1) ) {
                    errors[key] = 'e_string';
                }
            }

            // Scroll to erros on top of the form
            if (Object.keys(errors).length !== 0 && errors.constructor === Object) {
                const elem = document.getElementById("invite");
                elem && elem.scrollIntoView();
            }
        }

    }
    return errors;
};

const formatMoney = (val: Number) => {
    if (val) {
        // add thousand separators " "
        const formattedValue = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        return `${formattedValue} €`;
    } else {
        return "0 €"
    }
};

const formatDate = (val: string) => {
    return moment(val).format("D.M.YYYY");
};

//source: https://medium.com/javascript-in-plain-english/how-to-check-for-a-number-in-javascript-8d9024708153
const isNumber = (value:any):boolean => {
    // First: Check typeof and make sure it returns number
    // This code coerces neither booleans nor strings to numbers,
    // although it would be possible to do so if desired.
    if (typeof value !== 'number') {
      return false
    }
    // Reference for typeof:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
    // Second: Check for NaN, as NaN is a number to typeof.
    // NaN is the only JavaScript value that never equals itself.
    if (value !== Number(value)) {
      return false
    }
    // Reference for NaN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN
    // Note isNaN() is a broken function, but checking for self-equality works as NaN !== NaN
    // Alternatively check for NaN using Number.isNaN(), an ES2015 feature that works how one would expect

    // Third: Check for Infinity and -Infinity.
    // Realistically we want finite numbers, or there was probably a division by 0 somewhere.
    if (value === Infinity || value === -Infinity) {
      return false
    }
    return true
}

const numberSign = (value:number):number => {
    //positive = 1, negative = -1, zero = 0
    return Math.sign(value);
};

const updateObject = (oldObject:any, updateProps:any) => {
    return {
        ...oldObject,
        ...updateProps
    };
};

const formatVs = (input: number):number => {
    return Number((input * 100).toFixed(2));
}


export {
    validate,
    formatMoney,
    formatDate,
    updateObject,
    formatVs
};