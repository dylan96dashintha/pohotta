import { Controller, Body, ValidationPipe, UsePipes, Post, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { LandingPageService } from './landing-page.service';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { ForecastResult } from './landing-page.model';
import { JoinInviteListDto } from './dto/join-invite-list.dto';

@Controller('api/v1/landing-page')
export class LandingPageController {
    constructor(private landingPageService: LandingPageService) {}

    @Get('/')
    getLandingPage(): void {
      this.landingPageService.getLandingPage();
    }

    @Post('/forecast')
    @UsePipes(ValidationPipe)
    postForecast(@Body() createForecastDto:CreateForecastDto): ForecastResult {
      return this.landingPageService.postForecast(createForecastDto);
    }


    @Post('/join-invite-list')
    @UsePipes(ValidationPipe)
    postJoinInviteList(@Body() joinInviteListDto:JoinInviteListDto, @Res() res: Response): any {
      return this.landingPageService.postJoinInviteList(joinInviteListDto, res);
    }
}
