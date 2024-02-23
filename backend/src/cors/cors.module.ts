import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import corsConfig from './config/cors.config';
import { CorsService } from './cors.service';

@Module({})
export class CorsModule {
  static forRoot(): DynamicModule {
    return {
      module: CorsModule,
      imports: [ConfigModule.forFeature(corsConfig)],
      providers: [CorsService],
      exports: [CorsService],
    };
  }
}
