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

    /**
     * @description Proxy URL
     *
     * Optionally, provide a proxy URL path that will be concatenated with the original API path.
     * For example, if proxyUrl is '/api' and the original request is to '/block',
     * the request will be sent to '/api/block'.
     * You can provide absolute as well as relative URLs.
     * The original target URL is passed in the 'fs-target-url' header for the proxy to forward to.
     * This is useful to prevent CORS issues when making requests from a browser.
     */
    proxyUrl?: string
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

export type CategoryChildsParameters = {
    /**
     * @description Description missing for key
     */
    key: string;
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

export type ProductReviewsParameters = {
    /**
     * @description Description missing for key
     */
    key: string;
}


/* List of all blocks, used for IDE autocompletion */

type ListingParameters = {
    BrandListing: BrandListingParameters
    BrandProducts: BrandProductsParameters
    CategoryChilds: CategoryChildsParameters
    CategoryNestedChilds: CategoryNestedChildsParameters
    CategoryProducts: CategoryProductsParameters
    ProductReviews: ProductReviewsParameters
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
    ProductCard: never
    ProductFull: never
    ProductReview: never
    ProductVariant: never
}

export type Listings = {
    BrandListing: BrandListingParameters
    BrandProducts: BrandProductsParameters
    CategoryChilds: CategoryChildsParameters
    CategoryNestedChilds: CategoryNestedChildsParameters
    CategoryProducts: CategoryProductsParameters
    ProductReviews: ProductReviewsParameters
}

declare global {
export type BrandCard = components['schemas']['BrandCard']
export type BrandFull = components['schemas']['BrandFull']
export type BrandListing = components['schemas']['BrandListing']
export type BrandProducts = components['schemas']['BrandProducts']
export type CategoryChilds = components['schemas']['CategoryChilds']
export type CategoryFull = components['schemas']['CategoryFull']
export type CategoryItem = components['schemas']['CategoryItem']
export type CategoryMenu = components['schemas']['CategoryMenu']
export type CategoryNested = components['schemas']['CategoryNested']
export type CategoryNestedChilds = components['schemas']['CategoryNestedChilds']
export type CategoryProducts = components['schemas']['CategoryProducts']
export type ProductCard = components['schemas']['ProductCard']
export type ProductFull = components['schemas']['ProductFull']
export type ProductReview = components['schemas']['ProductReview']
export type ProductReviews = components['schemas']['ProductReviews']
export type ProductVariant = components['schemas']['ProductVariant']
}

export type Responses = {
    BrandCard: BrandCard
    BrandFull: BrandFull
    BrandListing: BrandListing
    BrandProducts: BrandProducts
    CategoryChilds: CategoryChilds
    CategoryFull: CategoryFull
    CategoryItem: CategoryItem
    CategoryMenu: CategoryMenu
    CategoryNested: CategoryNested
    CategoryNestedChilds: CategoryNestedChilds
    CategoryProducts: CategoryProducts
    ProductCard: ProductCard
    ProductFull: ProductFull
    ProductReview: ProductReview
    ProductReviews: ProductReviews
    ProductVariant: ProductVariant
}

export type ListingQueryFilters = {
    BrandListing: components['schemas']['BrandListingQueryOptions']['filter']
    BrandProducts: components['schemas']['BrandProductsQueryOptions']['filter']
    CategoryChilds: components['schemas']['CategoryChildsQueryOptions']['filter']
    CategoryNestedChilds: components['schemas']['CategoryNestedChildsQueryOptions']['filter']
    CategoryProducts: components['schemas']['CategoryProductsQueryOptions']['filter']
    ProductReviews: components['schemas']['ProductReviewsQueryOptions']['filter']
}

export type ListingQuerySorts = {
    BrandListing: components['schemas']['BrandListingQueryOptions']['sort']
    BrandProducts: components['schemas']['BrandProductsQueryOptions']['sort']
    CategoryChilds: components['schemas']['CategoryChildsQueryOptions']['sort']
    CategoryNestedChilds: components['schemas']['CategoryNestedChildsQueryOptions']['sort']
    CategoryProducts: components['schemas']['CategoryProductsQueryOptions']['sort']
    ProductReviews: components['schemas']['ProductReviewsQueryOptions']['sort']
}

type FetchMode = {
    BrandCard: 'key';
    BrandFull: 'key';
    BrandListing: 'query';
    BrandProducts: 'query';
    CategoryChilds: 'query';
    CategoryFull: 'key';
    CategoryItem: 'key';
    CategoryMenu: 'key';
    CategoryNested: 'key';
    CategoryNestedChilds: 'query';
    CategoryProducts: 'query';
    ProductCard: 'key';
    ProductFull: 'key';
    ProductReview: 'key';
    ProductReviews: 'query';
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
