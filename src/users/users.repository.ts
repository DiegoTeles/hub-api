import { singleton } from 'tsyringe';
import { BaseRepository, IBaseRepository } from '../core/repos/base.repos';
import { User } from './users.entity';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUsersRepository extends IBaseRepository<User> {}

@singleton<UsersRepository>()
export class UsersRepository
  extends BaseRepository<User>
  implements IUsersRepository
{
  constructor() {
    super(User);
  }
}
