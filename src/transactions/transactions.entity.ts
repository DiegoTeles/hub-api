import {
  Table,
  Column,
  Model,
  DataType,
  AutoIncrement,
  PrimaryKey,
} from 'sequelize-typescript';

export interface TransactionAttributes {
  id: bigint;
  transactionType: number;
  date: string;
  product: string;
  value: number;
  seller: string;
}

@Table({
  timestamps: true,
})
export class Transaction extends Model<TransactionAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: bigint;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  transactionType: number;

  @Column({
    type: DataType.STRING(30),
    allowNull: false,
  })
  product: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  value: number;

  @Column({
    type: DataType.STRING(21),
    allowNull: false,
  })
  seller: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  date: Date;
}
