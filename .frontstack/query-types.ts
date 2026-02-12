/**
 * This file was automatically generated using the
 * frontstack CLI, please do not edit it manually!
 */

export type Filter<T> = EqualsFilter<T> | RangeFilter<T> | ContainsFilter<T> | LogicalFilter<T>;

/**
 * Helper Types
 */
type NumericKeys<T> = {
  [K in keyof T]: T[K] extends number ? K : never
}[keyof T];

type EnumKeys<T> = {
  [K in keyof T]: T[K] extends string ? (string extends T[K] ? never : K) : never
}[keyof T];

// All string keys that are not enums
type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T] & Exclude<keyof T, EnumKeys<T>>;

/**
 * Filter a field by equality. You can use an array of values to filter by multiple values
 *
 * @example
 * {
 *   type: 'equals',
 *   field: 'color',
 *   value: ['Red', 'Blue']
 * }
 */
export type EqualsFilter<T> = {
  [K in keyof T]: {
    type: 'equals';
    field: K;
    value: T[K] | T[K][];
  }
}[keyof T];

/**
 * Filter a field by a range. You can use either from, to or both
 *
 * @example
 * {
 *   type: 'range',
 *   field: 'price',
 *   from: 10,
 *   to: 100
 * }
 */
export type RangeFilter<T> = {
  [K in NumericKeys<T>]: {
    type: 'range';
    field: K;
    from?: T[K];
    to?: T[K];
  }
}[NumericKeys<T>];

/**
 * Filter a field by a substring match.
 *
 * @example
 * {
 *   type: 'contains',
 *   field: 'name',
 *   value: 'Dress'
 * }
 */
export type ContainsFilter<T> = {
  [K in StringKeys<T>]: {
    type: 'contains';
    field: K;
    value: string;
  }
}[StringKeys<T>];

/**
 * Combine multiple filters with a logical operator
 *
 * @example
 * {
 *   type: 'and',
 *   filter: [
 *     {
 *       type: 'equals',
 *       field: 'color',
 *       value: 'Red'
 *     },
 *     {
 *       type: 'range',
 *       field: 'price',
 *       from: 10,
 *       to: 100
*      }
 *   ]
 * }
 */
export type LogicalFilter<T> = {
  type: 'and' | 'or' | 'not';
  filter: Filter<T>[];
}

export type SortField<T> = keyof T;

/**
 * Sort results by a field and ordering direction
 *
 * @example
 * {
 *   field: 'publishedAt',
 *   order: 'asc'
 * }
 */
export type Sort<T> = {
  field: SortField<T>;
  order: 'asc' | 'desc';
}

export type Query<FilterType, SortType> = {
  /**
   * Filter results by a set of conditions
   */
  filter?: Filter<FilterType>[];
  /**
   * Will search fields that are marked as searchable
   */
  search?: string;
  /**
   * Sort results by a field and direction
   *
   * There are three ways to sort:
   *
   *  * A single sort object
   *  * An array of sort objects
   *  * A single sort field string
   */
  sort?: Sort<SortType> | Sort<SortType>[] | SortField<SortType>;
  /**
   * Limit the number of results returned
   */
  limit?: number;
  /**
   * Paginate results
   */
  page?: number;
} 