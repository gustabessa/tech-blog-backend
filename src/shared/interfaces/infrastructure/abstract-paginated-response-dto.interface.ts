export abstract class AbstractPaginatedResponseDTO<T> {
  data!: T[];
  total!: number;
  page!: number;
  limit!: number;
}
