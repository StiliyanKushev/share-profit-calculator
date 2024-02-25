import { HttpStatus, INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from 'database/database.module';
import { IamModule } from 'iam/iam.module';
import path from 'path';
import { RedisModule } from 'redis/redis.module';
import { SolveDto } from 'stocks/dto/solve.dto';
import { StocksModule } from 'stocks/stocks.module';
import request from 'supertest';
import { ValidationModule } from 'validation/validation.module';

describe('[Feature] STOCKS - /stocks', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: path.join(__dirname, '../../.env.e2e'),
        }),
        DatabaseModule.forRoot(),
        RedisModule.forRoot(),
        ValidationModule.forRoot(),
        IamModule,
        StocksModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  function getRandomAuthToken() {
    return request(app.getHttpServer())
      .post('/authentication/sign-up')
      .send({
        // prevent user conflict
        email: `user${Math.random()}@email.com`,
        password: '0123456789',
      })
      .then<string>(({ body: { accessToken } }) => accessToken);
  }

  describe('Solve [POST /solve]', () => {
    it('should throw if not logged in', () => {
      return request(app.getHttpServer())
        .post('/stocks/solve')
        .send({
          startUnixTimestamp: 123,
          endUnixTimestamp: 123,
          funds: 123,
        } as SolveDto)
        .expect(HttpStatus.UNAUTHORIZED);
    });
    it('should throw if dto is invalid', async () => {
      return request(app.getHttpServer())
        .post('/stocks/solve')
        .set('Authorization', 'Bearer ' + (await getRandomAuthToken()))
        .send({
          a: 123,
          b: 123,
          c: 123,
        })
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('should throw if dates are invalid', async () => {
      return request(app.getHttpServer())
        .post('/stocks/solve')
        .set('Authorization', 'Bearer ' + (await getRandomAuthToken()))
        .send({
          startUnixTimestamp: 1000,
          endUnixTimestamp: 500,
          funds: 123,
        } as SolveDto)
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('should throw if insufficient funds', async () => {
      return request(app.getHttpServer())
        .post('/stocks/solve')
        .set('Authorization', 'Bearer ' + (await getRandomAuthToken()))
        .send({
          startUnixTimestamp: 1000,
          endUnixTimestamp: 2000,
          funds: 0,
        } as SolveDto)
        .expect(HttpStatus.BAD_REQUEST);
    });
    it('should respond with a solution', async () => {
      return request(app.getHttpServer())
        .post('/stocks/solve')
        .set('Authorization', 'Bearer ' + (await getRandomAuthToken()))
        .send({
          startUnixTimestamp: 1672704000000,
          endUnixTimestamp: 1708819200000,
          funds: 123,
        } as SolveDto)
        .expect(HttpStatus.OK)
        .then(({ body }) => {
          expect(body.profit).toBeDefined();
          expect(body.buyPrice).toBeDefined();
          expect(body.sellPrice).toBeDefined();
          expect(body.buyDate).toBeDefined();
          expect(body.sellDate).toBeDefined();
          expect(body.sharesBought).toBeDefined();
        });
    });
  });

  afterAll(async () => {
    await app?.close();
  });
});
