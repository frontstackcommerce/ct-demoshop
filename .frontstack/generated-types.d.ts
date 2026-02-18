/**
 * This file was automatically generated using the
 * frontstack CLI, please do not edit it manually!
 */

import type { components } from './fetch-api.d.ts'

type RequestOptions = {
    /**
     * @description URL to the current page
     *
     * Optionally, frontstack accepts a URL to the current page. This is useful for tracking purposes.
     */
    requestUrl?: string

    /**
     * @description Context key
     *
     * Providing a context key will override the default context key for the request
     */
    contextKey?: string
}

/* List of all types used to fetch block parameters */

export type BrandListingParameters = {
}

export type BrandProductsParameters = {
    /**
     * @description Description missing for brandKey
     */
    brandKey: string;
}

export type CartProductsParameters = {
    /**
     * @description Description missing for keys
     */
    keys: Array<string>;
}

export type CategoryChildsParameters = {
    /**
     * @description Description missing for key
     */
    key: string;
}

export type CategoryMetaParameters = {
    /**
     * @description Description missing for categoryKeys
     */
    categoryKeys: Array<string>;
}

export type CategoryNestedChildsParameters = {
    /**
     * @description Description missing for key
     */
    key: string;
}

export type CategoryProductsParameters = {
    /**
     * @description Description missing for key
     */
    key: string;
}

export type FavoritesProductsParameters = {
    /**
     * @description Description missing for keys
     */
    keys: Array<string>;
}

export type MenuTreeParameters = {
}

export type ProductReviewsParameters = {
    /**
     * @description Description missing for key
     */
    key: string;
}

export type ProductSearchParameters = {
    /**
     * @description Description missing for categoryKey
     */
    categoryKey?: string;
}


/* List of all blocks, used for IDE autocompletion */

type ListingParameters = {
    BrandListing: BrandListingParameters
    BrandProducts: BrandProductsParameters
    CartProducts: CartProductsParameters
    CategoryChilds: CategoryChildsParameters
    CategoryMeta: CategoryMetaParameters
    CategoryNestedChilds: CategoryNestedChildsParameters
    CategoryProducts: CategoryProductsParameters
    FavoritesProducts: FavoritesProductsParameters
    MenuTree: MenuTreeParameters
    ProductReviews: ProductReviewsParameters
    ProductSearch: ProductSearchParameters
}

type Endpoints = {
    [key in keyof Listings | keyof Blocks]: string;
}

/* Types for split block/listing methods */
export type Blocks = {
    BrandCard: never
    BrandFull: never
    CategoryFull: never
    CategoryItem: never
    CategoryMenu: never
    CategoryNested: never
    MenuItem: never
    ProductCard: never
    ProductFull: never
    ProductReview: never
    ProductVariant: never
}

export type Listings = {
    BrandListing: BrandListingParameters
    BrandProducts: BrandProductsParameters
    CartProducts: CartProductsParameters
    CategoryChilds: CategoryChildsParameters
    CategoryMeta: CategoryMetaParameters
    CategoryNestedChilds: CategoryNestedChildsParameters
    CategoryProducts: CategoryProductsParameters
    FavoritesProducts: FavoritesProductsParameters
    MenuTree: MenuTreeParameters
    ProductReviews: ProductReviewsParameters
    ProductSearch: ProductSearchParameters
}

declare global {
export type BrandCard = components['schemas']['BrandCard']
export type BrandFull = components['schemas']['BrandFull']
export type BrandListing = components['schemas']['BrandListing']
export type BrandProducts = components['schemas']['BrandProducts']
export type CartProducts = components['schemas']['CartProducts']
export type CategoryChilds = components['schemas']['CategoryChilds']
export type CategoryFull = components['schemas']['CategoryFull']
export type CategoryItem = components['schemas']['CategoryItem']
export type CategoryMenu = components['schemas']['CategoryMenu']
export type CategoryMeta = components['schemas']['CategoryMeta']
export type CategoryNested = components['schemas']['CategoryNested']
export type CategoryNestedChilds = components['schemas']['CategoryNestedChilds']
export type CategoryProducts = components['schemas']['CategoryProducts']
export type FavoritesProducts = components['schemas']['FavoritesProducts']
export type MenuItem = components['schemas']['MenuItem']
export type MenuTree = components['schemas']['MenuTree']
export type ProductCard = components['schemas']['ProductCard']
export type ProductFull = components['schemas']['ProductFull']
export type ProductReview = components['schemas']['ProductReview']
export type ProductReviews = components['schemas']['ProductReviews']
export type ProductSearch = components['schemas']['ProductSearch']
export type ProductVariant = components['schemas']['ProductVariant']
}

export type Responses = {
    BrandCard: BrandCard
    BrandFull: BrandFull
    BrandListing: BrandListing
    BrandProducts: BrandProducts
    CartProducts: CartProducts
    CategoryChilds: CategoryChilds
    CategoryFull: CategoryFull
    CategoryItem: CategoryItem
    CategoryMenu: CategoryMenu
    CategoryMeta: CategoryMeta
    CategoryNested: CategoryNested
    CategoryNestedChilds: CategoryNestedChilds
    CategoryProducts: CategoryProducts
    FavoritesProducts: FavoritesProducts
    MenuItem: MenuItem
    MenuTree: MenuTree
    ProductCard: ProductCard
    ProductFull: ProductFull
    ProductReview: ProductReview
    ProductReviews: ProductReviews
    ProductSearch: ProductSearch
    ProductVariant: ProductVariant
}

export type ListingQueryFilters = {
    BrandListing: components['schemas']['BrandListingQueryOptions']['filter']
    BrandProducts: components['schemas']['BrandProductsQueryOptions']['filter']
    CartProducts: components['schemas']['CartProductsQueryOptions']['filter']
    CategoryChilds: components['schemas']['CategoryChildsQueryOptions']['filter']
    CategoryMeta: components['schemas']['CategoryMetaQueryOptions']['filter']
    CategoryNestedChilds: components['schemas']['CategoryNestedChildsQueryOptions']['filter']
    CategoryProducts: components['schemas']['CategoryProductsQueryOptions']['filter']
    FavoritesProducts: components['schemas']['FavoritesProductsQueryOptions']['filter']
    MenuTree: components['schemas']['MenuTreeQueryOptions']['filter']
    ProductReviews: components['schemas']['ProductReviewsQueryOptions']['filter']
    ProductSearch: components['schemas']['ProductSearchQueryOptions']['filter']
}

export type ListingQuerySorts = {
    BrandListing: components['schemas']['BrandListingQueryOptions']['sort']
    BrandProducts: components['schemas']['BrandProductsQueryOptions']['sort']
    CartProducts: components['schemas']['CartProductsQueryOptions']['sort']
    CategoryChilds: components['schemas']['CategoryChildsQueryOptions']['sort']
    CategoryMeta: components['schemas']['CategoryMetaQueryOptions']['sort']
    CategoryNestedChilds: components['schemas']['CategoryNestedChildsQueryOptions']['sort']
    CategoryProducts: components['schemas']['CategoryProductsQueryOptions']['sort']
    FavoritesProducts: components['schemas']['FavoritesProductsQueryOptions']['sort']
    MenuTree: components['schemas']['MenuTreeQueryOptions']['sort']
    ProductReviews: components['schemas']['ProductReviewsQueryOptions']['sort']
    ProductSearch: components['schemas']['ProductSearchQueryOptions']['sort']
}

type FetchMode = {
    BrandCard: 'key';
    BrandFull: 'key';
    BrandListing: 'query';
    BrandProducts: 'query';
    CartProducts: 'query';
    CategoryChilds: 'query';
    CategoryFull: 'key';
    CategoryItem: 'key';
    CategoryMenu: 'key';
    CategoryMeta: 'query';
    CategoryNested: 'key';
    CategoryNestedChilds: 'query';
    CategoryProducts: 'query';
    FavoritesProducts: 'query';
    MenuItem: 'key';
    MenuTree: 'query';
    ProductCard: 'key';
    ProductFull: 'key';
    ProductReview: 'key';
    ProductReviews: 'query';
    ProductSearch: 'query';
    ProductVariant: 'key';
}

declare global {
    export type Page = components['schemas']['Page']
    export type PageRoute = components["schemas"]["PageRoute"];
    export type RouteMeta = components["schemas"]["RouteMeta"];
    export type AlternateRoute = components["schemas"]["AlternateRoute"];
}

declare global {
    export type Pagination = components["schemas"]["_page"];
    export type FilterData = components["schemas"]["_filter"];
    export type FilterGroup = components["schemas"]["_filter"][string];
    export type Filter = components["schemas"]["_filter"][string][number];
    export type SortingGroup = components["schemas"]["_sort"];
    export type Sorting = components["schemas"]["_sort"][number];
    export type AggregationData = components["schemas"]["_aggregation"];
    export type AggregationGroup = components["schemas"]["_aggregation"][string];
    export type Aggregation = components["schemas"]["_aggregation"][string]["total"];
}

declare global {
    export type Media = components['schemas']['Media']
    export type Price = components['schemas']['Price']
    export type Seo = components['schemas']['Seo']
    export type Vendor = components['schemas']['Vendor']
    export type Weight = components['schemas']['Weight']
    export type Option = components['schemas']['Option']
    export type Swatch = components['schemas']['Swatch']
    export type PriceScale = components['schemas']['PriceScale']
    export type Sorting = components['schemas']['Sorting']
    export type Availability = components['schemas']['Availability']
    export type StockLevel = components['schemas']['StockLevel']
}

declare global {
    export type ContextToken = string

    export type Context = {
        /**
        * The region of the context - e.g. 'uk'
        */
        region: string
        /**
        * The locale of the context - e.g. 'en-gb'
        */
        locale: string
        /**
        * The scope of the context - e.g. 'b2c'
        */
        scope: string
        /**
        * The identifier of the context
        */
        token: ContextToken
    }

    export type ContextOption = {
        /**
        * The region of the context - e.g. 'uk'
        */
        region: string
        /**
        * The currency of the context - e.g. 'GBP'
        */
        currency: string
        /**
        * List of locales of the context
        */
        locales: Array<Locale>
    }

    export type Locale = {
        /**
        * The key of the locale - e.g. 'en-GB'
        */
        key: string
        /**
        * The URL configured for the locale - e.g. 'https://demo-shop.com/uk/en'
        */
        url: string
    }
} 