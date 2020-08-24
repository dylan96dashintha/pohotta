import React from 'react';
import ReactDOM from 'react-dom';

import { render, fireEvent, wait } from '@testing-library/react';
import TargetCalculator from "./TargetCalculator";
import strings from '../TargetCalculator/strings'

it('component renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<TargetCalculator />, div)

})

const changeInputVal = ((input:any, val:Number) => {
    fireEvent.change(input, {
        target: {
            value: val
        }
    })
})

jest.mock('react-chartjs-2', () => ({
    Bar: () => null
}));


it('form and report works', async () => {

    const { container, queryByText } = render(<TargetCalculator />)
    //render calculator for testing

    const currentInvestments = container.querySelector('input[name="currentInvestments"]')
    const monthlyIncome = container.querySelector('input[name="monthlyIncome"]')
    const monthlyCost = container.querySelector('input[name="monthlyCost"]')
    const goal = container.querySelector('input[name="goal"]')
    const interestRate = container.querySelector('input[name="interestRate"]')
    const submit = container.querySelector('#submitTargetValues')
    //select inputs for testing

    expect(queryByText(strings.estimate_calculator)).toBeTruthy();
    expect(queryByText(strings.estimate_calculator_desc)).toBeTruthy();
    expect(queryByText(strings.estimate_calculator_action)).toBeTruthy();
    //check that header and instructions are rendered


    await wait(() => {
        changeInputVal(currentInvestments, 20000)
    })

    await wait(() => {
        changeInputVal(monthlyIncome, 2500)
    })

    await wait(() => {
        changeInputVal(monthlyCost, 1500)
    })

    await wait(() => {
        changeInputVal(goal, 30000)
    })

    await wait(() => {
        changeInputVal(interestRate, 7)
    })


    //fill inputs with data


    expect(queryByText(strings.show_estimate)).toBeTruthy();
    //make sure that button has right text



    await wait(() => {
        fireEvent.click(submit)
    })
    //submit form


    expect(queryByText(strings.edit_info)).toBeTruthy();
    expect(queryByText(strings.report_now)).toBeTruthy();
    expect(queryByText(strings.report_yearly)).toBeTruthy();
    expect(queryByText(strings.report_estimated_grow)).toBeTruthy();



})
