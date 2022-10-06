import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

export interface TransactionAttributes {
  id: bigint;
  email: string;
  name: string;
  role: string;
  status: number;
  password: string;
  salt: string;
  confirmationToken: string;
  recoverToken: string;
}

@Table({
  timestamps: true,
})
export class User extends Model<TransactionAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: bigint;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  role: string;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  salt: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  confirmationToken: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  recoverToken: string;

  async checkPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
