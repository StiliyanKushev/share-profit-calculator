import { registerAs } from '@nestjs/config';
import Joi from 'joi';

export default registerAs('cors', () => {
  return {
    origin: process.env.CORS_ORIGIN,
  };
});

export const corsConfigSchema = {
  CORS_ORIGIN: Joi.string().required(),
};
