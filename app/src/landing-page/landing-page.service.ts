import { Injectable, BadRequestException, Logger, InternalServerErrorException } from '@nestjs/common';
import * as Fns from 'date-fns';

import { CreateForecastDto } from './dto/create-forecast.dto';
import { Forecast, ForecastRow, ForecastResult, Invite } from './landing-page.model';
import {EventType} from '../events/events.interface'
import { EventsService } from '../events/events.service';
import { DbService } from '../db/db.service';
import { JoinInviteListDto } from './dto/join-invite-list.dto';


@Injectable()
export class LandingPageService {
    private logger = new Logger('LandingPageService');
    constructor(
        private readonly event: EventsService,
        private readonly dbService: DbService
    ) {};

    getLandingPage() {
        this.event.addEvent({eventType: EventType.pageview,trigger: 'front-page', details: null,memberId: null});
    }

    postForecast(createForecastDto: CreateForecastDto): ForecastResult | null {
        const { goal, currentInvestments } = createForecastDto;

        //Check that person is not already at goal
        if (goal !== null && currentInvestments >= goal) {
            throw new BadRequestException('e_goal_less_than_current');
        }

        // Add event "landing-page-forecast" to database
        this.event.addEvent({eventType: EventType.click,trigger: 'front-page-forecast-btn',details: null,memberId: null});

        // Create the forecast
        let result:ForecastResult = null;
        try {
            result = this.calculateForecast(createForecastDto);
        } catch (error) {
            // Throw error from calculator
            if (error.status = 400) {
                throw error;
            }
            this.logger.error(`Create the forecast failed`, error.stack);
            throw new InternalServerErrorException('e_500');
        }
        return result;
    }

    private calculateForecast = (forecast : Forecast):ForecastResult => {
        const {goal:originalGoal, currentInvestments, monthlyIncome, monthlyCost, interestRate: OriginalInterestRate} = forecast;
    
        const forecastRows: ForecastRow[] = [];
        const goal : number = originalGoal || originalGoal === 0 ? originalGoal : monthlyCost * 12 * 25; // 4% rule
        const start : Date = new Date();
        const interestRate = 1+ OriginalInterestRate / 12 / 100;
        const savings : number = monthlyIncome - monthlyCost;

        // For chart js
        const datasets : any[] = [{
            data : [],
            label : "Pääoma"
        }, {
            data: [],
            label: "Tuotto"
        },{
            data: [],
            label: "Tavoite"
        }];
        const visualLabels : string[] = [];
        
        // For forecast rows
        let prevRow : ForecastRow;
        let cumulatedInvestments : number = 0;
        let cumulatedSavings : number = 0;
        let i : number = 0;
        const maxIterations = 12*30; // max is 30 years

        // Investments decreasing >> impossible to reach goal
        if (goal < currentInvestments) {
            throw new BadRequestException('e_goal_less_than_current');
        }

        // goal can be zero
        while (goal >= cumulatedInvestments) {

            let row : ForecastRow = {
                id : i,
                date : Fns.addMonths(Fns.endOfMonth(start),i),
                payment : savings,
                interestRate : interestRate,
                cumulatedInvestments : i > 0 ? (prevRow.cumulatedInvestments + savings) * (prevRow.cumulatedInvestments > 0 ? interestRate : 1) : currentInvestments, // no interest or savings for first month or if principal is negative
                cumulatedSavings: i > 0 ? (prevRow.cumulatedSavings + savings) : currentInvestments,
            }

            cumulatedInvestments = row.cumulatedInvestments;
            cumulatedSavings = row.cumulatedSavings;
            prevRow = row;
            // Data
            forecastRows.push(row);
            // Labels
            visualLabels.push(Fns.format(row.date, "MM/yyyy"));
            // Dataset invested
            datasets[0].data.push(Number(Math.round(parseFloat( ( cumulatedSavings ) + 'e' + 0)) + 'e-' + 0)); // no interest or savings for first month, 0 decimals
            // Dataset return on investment with 2 decimals
            datasets[1].data.push(Number(Math.round(parseFloat( (cumulatedInvestments - cumulatedSavings) + 'e' + 0)) + 'e-' + 0)); // no interest or savings for first month, 0 decimals
            // Dataset goal
            datasets[2].data.push(goal);
            i++;

            // Investments decreasing >> impossible to reach goal
            if (cumulatedInvestments < currentInvestments) {
                throw new BadRequestException('e_negative_goal');
            }
            
            // Prevent app crashing 
            if (i >= maxIterations) {
                throw new BadRequestException('e_too_long');
            }

        }
        
        // Make final result more readable
        const lastRow : ForecastRow = forecastRows.filter(row => row.id === i-1)[0];
        const goalDate : Date = lastRow.date;
        const daysToGoalDate = Fns.differenceInDays(lastRow.date, start);
        const fullYearsToGoalDate : number = Math.floor(daysToGoalDate / 365);
        const monthsToGoalDate : string = this.formatDecimals( (daysToGoalDate - fullYearsToGoalDate * 365) / 30,2).toString(); //30 pv kuukaudessa, kaava: Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces)
        const savingsTotal : number = this.formatDecimals(savings * (i-1),2); //investments start from next month
        const returnOnInvestments : number = this.formatDecimals(lastRow.cumulatedInvestments - savingsTotal - currentInvestments,0);

        const result : ForecastResult = {
            goal: goal,
            currentInvestments : currentInvestments,
            savingsTotal : savingsTotal,
            returnOnInvestment : returnOnInvestments,
            goalDate : goalDate,
            days: daysToGoalDate,
            fullYears : fullYearsToGoalDate,
            months : monthsToGoalDate.replace(".",","),
            result : forecastRows,
            visualLabels:  visualLabels,
            datasets : datasets 
        };

        return result;
    };

    private formatDecimals = (value:number,decimalPlaces:number) => {
        return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces);
    };

    private formatMoney = (val: Number) => {
        if (val) {
            // add thousand separators " "
            const formattedValue = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            return `${formattedValue} €`;
        } else {
            return "0 €"
        }
    };

    postJoinInviteList(joinInviteListDto: JoinInviteListDto, res: any): any {
        const pool = this.dbService.pool;
        const {email, subscription, important, issue, solution} = joinInviteListDto;

        const conf:Invite = {
            email : email,
            subscription : subscription,
            important : important ? important : null,
            issue : issue ? issue : null,
            solution : solution ? solution : null
        };

        const query = {
            text: 'select * from app.invite_create($1,$2,$3,$4,$5);',
            values: [conf.email,conf.subscription,conf.important,conf.issue
                ,conf.solution
            ]
        };
        pool.query(query)
        .then( (response) => {
            const result:any = response.rows[0];
            const message = result.js.message;
            const status = result.status;

            switch (status) {
                case 201:
                    res.status(result.status).json({message: 'welcome_to_invite_list', statusCode: result.status});
                    break;
                // email exists
                case 409:
                    res.status(result.status).json({message: 'e_email_exists', statusCode: result.status});
                    break;
                    // something went wrong
                    case 500:
                        this.logger.error(`Create invite failed in database`, result.js.message + "/" + result.js.detail + "/" + result.js.context);
                        throw new InternalServerErrorException();
                default:
                    break;
            }

        })
        // ToDo: kunnollinen error handler
        .catch( (error: Error) =>{
            this.logger.error(`Failed join invite list`, error.stack);
            res.status(500).json({message: 'e_500', statusCode: 500});
        });
    };
}
