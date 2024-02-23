import { INestApplication, Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import corsConfig from './config/cors.config';

@Injectable()
export class CorsService {
  constructor(
    @Inject(corsConfig.KEY)
    private readonly corsConfiguration: ConfigType<typeof corsConfig>,
  ) {}

  /**
   * Setup cors origin based on the env passed.
   */
  /* istanbul ignore next */
  setup(app: INestApplication) {
    app.enableCors({
      origin: this.corsConfiguration.origin,
    });
  }
}
