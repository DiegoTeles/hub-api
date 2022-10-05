import { QueryTypes, Model, Sequelize } from 'sequelize';

export interface IBaseRepository<T extends Model> {
  findAll(predicate): Promise<T[]>;
  findAndCountAll(predicate): Promise<T[]>;
  findOne(predicate): Promise<T>;
  count(predicate): Promise<number>;
  createUnique(data): Promise<T>;
  create(data): Promise<T>;
  update<M>(
    data: Omit<M, 'id'>,
    predicate: { [key: string]: any },
  ): Promise<any>;
  findRaw(selectQuery: string): Promise<any>;
  delete(predicate): Promise<T>;
}

export class BaseRepository<T extends Model> implements IBaseRepository<T> {
  protected readonly sequelize: Sequelize;

  constructor(private Model) {
    this.sequelize = Model.sequelize;
  }

  public findAll(predicate): Promise<T[]> {
    return this.Model.findAll(predicate);
  }

  public findAndCountAll(predicate): Promise<T[]> {
    return this.Model.findAndCountAll(predicate);
  }

  public findOne(predicate): Promise<T> {
    return this.Model.findOne(predicate);
  }

  count(predicate): Promise<number> {
    return this.Model.count(predicate);
  }

  public createUnique(data): Promise<T> {
    delete data.id;

    return this.Model.findOrCreate({ where: data });
  }

  public create(data): Promise<any> {
    delete data.id;
    return this.Model.create(data);
  }

  public update<M>(
    data: Omit<M, 'id'>,
    predicate: { [key: string]: any },
  ): Promise<any> {
    return this.Model.update(data, predicate);
  }

  public delete(predicate): Promise<any> {
    return this.findOne(predicate).then((item) => item.destroy());
  }

  public async findRaw(selectQuery: string): Promise<any> {
    return await this.sequelize.query(selectQuery, { type: QueryTypes.SELECT });
  }
}
