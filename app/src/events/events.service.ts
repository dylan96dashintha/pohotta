import { Injectable, Logger } from '@nestjs/common';
import { Event } from './events.interface'

import { Pool } from 'pg';
import { DbService } from '../db/db.service';

@Injectable()
export class EventsService {
    constructor(private readonly dbService: DbService) {}
    private logger = new Logger('EventsService');
    private pool:Pool = this.dbService.pool;

    public addEvent = (event:Event):void => {
        const {eventType, trigger, details, memberId} = event;
        const query = {
            text: 'select * from app.event_create($1,$2,$3,$4);',
            values: [eventType,trigger,details,memberId]
            };
        this.pool.query(query)
        .catch(error =>{
            this.logger.error(`Failed event: ${eventType} ${trigger}`, error.stack);
        })
    };
}
