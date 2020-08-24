const forecastMockData = {
    "goal": 30000,
    "currentInvestments": 20000,
    "savingsTotal": 10000,
    "returnOnInvestment": 341,
    "goalDate": "2020-12-31T21:59:59.999Z",
    "days": 287,
    "fullYears": 0,
    "months": 9.57,
    "result": [
        {
            "id": 0,
            "date": "2020-03-31T20:59:59.999Z",
            "payment": 1000,
            "interestRate": 1.0058333333333334,
            "cumulatedInvestments": 20000
        },
        {
            "id": 1,
            "date": "2020-04-30T20:59:59.999Z",
            "payment": 1000,
            "interestRate": 1.0058333333333334,
            "cumulatedInvestments": 21122.5
        },
        {
            "id": 2,
            "date": "2020-05-31T20:59:59.999Z",
            "payment": 1000,
            "interestRate": 1.0058333333333334,
            "cumulatedInvestments": 22251.547916666666
        },
        {
            "id": 3,
            "date": "2020-06-30T20:59:59.999Z",
            "payment": 1000,
            "interestRate": 1.0058333333333334,
            "cumulatedInvestments": 23387.181946180557
        },
        {
            "id": 4,
            "date": "2020-07-31T20:59:59.999Z",
            "payment": 1000,
            "interestRate": 1.0058333333333334,
            "cumulatedInvestments": 24529.440507533276
        },
        {
            "id": 5,
            "date": "2020-08-31T20:59:59.999Z",
            "payment": 1000,
            "interestRate": 1.0058333333333334,
            "cumulatedInvestments": 25678.36224382722
        },
        {
            "id": 6,
            "date": "2020-09-30T20:59:59.999Z",
            "payment": 1000,
            "interestRate": 1.0058333333333334,
            "cumulatedInvestments": 26833.986023582882
        },
        {
            "id": 7,
            "date": "2020-10-31T21:59:59.999Z",
            "payment": 1000,
            "interestRate": 1.0058333333333334,
            "cumulatedInvestments": 27996.35094205378
        },
        {
            "id": 8,
            "date": "2020-11-30T21:59:59.999Z",
            "payment": 1000,
            "interestRate": 1.0058333333333334,
            "cumulatedInvestments": 29165.496322549097
        },
        {
            "id": 9,
            "date": "2020-12-31T21:59:59.999Z",
            "payment": 1000,
            "interestRate": 1.0058333333333334,
            "cumulatedInvestments": 30341.461717763967
        }
    ],
    "visualLabels": [
        "03/2020",
        "04/2020",
        "05/2020",
        "06/2020",
        "07/2020",
        "08/2020",
        "09/2020",
        "10/2020",
        "11/2020",
        "12/2020"
    ],
    "datasets": [
        {
            "data": [
                20000,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            ],
            "label": "Nyt"
        },
        {
            "data": [
                null,
                21122.5,
                22251.55,
                23387.18,
                24529.44,
                25678.36,
                26833.99,
                27996.35,
                29165.5,
                30341.46
            ],
            "label": "Ennuste"
        },
        {
            "data": [
                30000,
                30000,
                30000,
                30000,
                30000,
                30000,
                30000,
                30000,
                30000,
                30000
            ],
            "label": "Tavoite"
        }
    ]
}

export default {
    post: jest.fn(() => Promise.resolve({ data: forecastMockData }))
};