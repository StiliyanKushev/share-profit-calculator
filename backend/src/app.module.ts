import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from 'config.schema';
import { LoggingModule } from './logging/logging.module';
import { SwaggerSetupModule } from './swagger-setup/swagger-setup.module';

@Module({
  imports: [
    /**
     * import all globally scoped core modules
     */
    ConfigModule.forRoot({ validationSchema: configSchema }),
    LoggingModule.forRoot(),
    SwaggerSetupModule.forRoot(),

    /**
     * todo: import all feature modules
     */
  ],
})
export class AppModule {}
