import knex from 'knex';
import knexFile from '../../knexfile';
import { appEnv } from '../env';

const knexConfig = knexFile[appEnv];

export const pgConnection = knex(knexConfig);
