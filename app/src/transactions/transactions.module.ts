import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsRepository } from './transactions.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule],
    controllers: [TransactionsController],
    providers: [
        TransactionsService,
        TransactionsRepository
    ]
})
export class TransactionsModule {}
