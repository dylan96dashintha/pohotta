import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DbService {
    private logger = new Logger('DbService');
  
    private getPool = () => {

        let pool:any;

        // Same type of connection not working in dev & prod
        if (process.env.NODE_ENV !== 'development') { // notice extra space because of package.json
            // for production
            pool = new Pool({
                connectionString: process.env.DATABASE_URL,
                ssl: true,
                connectionTimeoutMillis: 2000,
                max: 18
            });
            this.logger.log('Connected to ' + process.env.NODE_ENV + ' db.');
        } else {
            // for development
            pool = new Pool({
                user: process.env.AUTH,
                host: process.env.HOST,
                database: process.env.DATABASE_NAME,
                password:  process.env.PASS,
                connectionTimeoutMillis: 2000,
                max: 18
            });
            this.logger.log('Connected to ' + process.env.NODE_ENV + ' db.');
        }

        pool.on('error', (error) => {
            this.logger.error(`An idle connection has experienced an error`, error.stack);
            throw new InternalServerErrorException('Tietokantayhteydessä tapahtui virhe. Ota yhteys tukeen.');
        });
        return pool;
    }

    public pool = this.getPool();
}


