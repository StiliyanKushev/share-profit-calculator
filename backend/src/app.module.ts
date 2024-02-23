import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from 'config.schema';
import { CorsModule } from 'cors/cors.module';
import { DatabaseModule } from 'database/database.module';
import { IamModule } from 'iam/iam.module';
import { RedisModule } from 'redis/redis.module';
import { UsersModule } from 'users/users.module';
import { ValidationModule } from 'validation/validation.module';
import { LoggingModule } from './logging/logging.module';
import { StocksModule } from './stocks/stocks.module';
import { SwaggerSetupModule } from './swagger-setup/swagger-setup.module';

@Module({
  imports: [
    /**
     * import all globally scoped core modules
     */
    ConfigModule.forRoot({ validationSchema: configSchema }),
    LoggingModule.forRoot(),
    DatabaseModule.forRoot(),
    RedisModule.forRoot(),
    SwaggerSetupModule.forRoot(),
    ValidationModule.forRoot(),
    CorsModule.forRoot(),

    /**
     * import all feature modules
     */
    UsersModule,
    IamModule,
    StocksModule,
  ],
})
export class AppModule {}
