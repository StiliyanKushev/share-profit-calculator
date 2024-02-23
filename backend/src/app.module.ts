import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from 'config.schema';
import { DatabaseModule } from 'database/database.module';
import { RedisModule } from 'redis/redis.module';
import { LoggingModule } from './logging/logging.module';
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

    /**
     * todo: import all feature modules
     */
  ],
})
export class AppModule {}
