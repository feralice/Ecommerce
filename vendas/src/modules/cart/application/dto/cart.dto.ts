import { IsNumber } from "class-validator";

export class CartRequestDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  amount: number;
}
