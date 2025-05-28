import { ORDER } from "@/modules/order/application/constant/order.constant";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrderDTO {
  @ApiProperty({
    description: ORDER.DTO.CREATE_ORDER.ADDRESS_ID.DESCRIPTION,
    example: ORDER.DTO.CREATE_ORDER.ADDRESS_ID.EXAMPLE,
  })
  @IsNumber()
  addressId: number;

  @ApiPropertyOptional({
    description: ORDER.DTO.CREATE_ORDER.AMOUNT_PAYMENTS.DESCRIPTION,
    example: ORDER.DTO.CREATE_ORDER.AMOUNT_PAYMENTS.EXAMPLE,
  })
  @IsOptional()
  @IsNumber()
  amountPayments?: number;

  @ApiPropertyOptional({
    description: ORDER.DTO.CREATE_ORDER.CODE_PIX.DESCRIPTION,
    example: ORDER.DTO.CREATE_ORDER.CODE_PIX.EXAMPLE,
  })
  @IsOptional()
  @IsString()
  codePix?: string;

  @ApiPropertyOptional({
    description: ORDER.DTO.CREATE_ORDER.DATE_PAYMENT.DESCRIPTION,
    example: ORDER.DTO.CREATE_ORDER.DATE_PAYMENT.EXAMPLE,
  })
  @IsOptional()
  @IsString()
  datePayment?: string;
}
