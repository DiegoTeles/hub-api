import { ApiProperty } from '@nestjs/swagger';
import { BaseQueryParametersDto } from '../../shared/dto/base-query-parameters.dto';

export class FindTransactionQueryDto extends BaseQueryParametersDto {
   /**
   * Send the seller's name so that we can have the return of individual transactions
   * @example MARIA CANDIDA
   */
  @ApiProperty({
    description: "Send the seller's name so that we can have the return of individual transactions ",
    example: "MARIA CANDIDA",
    required: false,
    type: String
  })
  seller?: string;
}
