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
        case 'development':
          config = databaseConfig.development;
          break;
        case 'production':
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }

      const sequelize = new Sequelize(config);
      try {
        sequelize.authenticate();
        sequelize.addModels([Transaction, User]);
        await sequelize.sync();
        console.log('Database connected successfully!');
        return sequelize;
      } catch (error) {
        console.log('config :>> ', config);
        console.error('Unable to connect to the database:', error);
      }
    },
  },
];
