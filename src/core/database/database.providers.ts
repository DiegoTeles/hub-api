import { Sequelize } from 'sequelize-typescript';

import databaseConfig from '../../configs/database/sequelize.config';
import { Transaction } from '../../transactions/transactions.entity';
import { User } from '../../users/users.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case 'DEVELOPMENT':
          config = databaseConfig.development;
          break;
        case 'TEST':
          config = databaseConfig.test;
          break;
        case 'PRODUCTION':
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      try {
        sequelize.authenticate();
        console.log('Database connected successfully!');
        sequelize.addModels([Transaction, User]);
        await sequelize.sync();
        return sequelize;
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    },
  },
];
