export class Paginate<T> {
  data: Array<T>;
  count: number;
}

export interface PaginateQuery {
  take: number;
  skip: number;
  keyword: string;
}
