export interface Forecast {
    goal: number;
    currentInvestments: number;
    monthlyIncome: number;
    monthlyCost: number;
    interestRate: number;
}

export interface ForecastRow {
    id : number;
    date : Date;
    payment : number;
    interestRate : number;
    cumulatedInvestments : number;
    cumulatedSavings: number
}

export interface DataSet {
    data : number[];
    label : string;
}

export interface ForecastResult {
    goal: number;
    currentInvestments : number;
    savingsTotal : number;
    returnOnInvestment : number;
    goalDate : Date;
    days : number,
    fullYears : number;
    months : string;
    result? : ForecastRow[];
    visualLabels? : string[];
    datasets? : DataSet[];
}

export interface Invite {
    email : string;
    subscription : string;
    important : string | null;
    issue : string | null;
    solution : string | null;
}




