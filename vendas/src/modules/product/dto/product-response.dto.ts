import { CategoryResponseDto } from "@/modules/category/dto/category-response.dto";

export class ProductResponseDto {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: CategoryResponseDto;
}
