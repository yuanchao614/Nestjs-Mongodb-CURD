import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  pageSize: number;

  @IsOptional()
  @IsPositive()
  pageIndex: number;
}