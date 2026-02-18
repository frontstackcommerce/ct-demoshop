export interface paths {
    "/block/brand/card/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch BrandCard
         * @description Fetch BrandCard
         */
        post: operations["getBrandCardBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/block/brand/full/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch BrandFull
         * @description Fetch BrandFull
         */
        post: operations["getBrandFullBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/brand/listing": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch BrandListing
         * @description Fetch BrandListing
         */
        post: operations["getBrandListingBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/brand/products": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch BrandProducts
         * @description Fetch BrandProducts
         */
        post: operations["getBrandProductsBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/cart/products": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch CartProducts
         * @description Fetch CartProducts
         */
        post: operations["getCartProductsBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/category/childs": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch CategoryChilds
         * @description Fetch CategoryChilds
         */
        post: operations["getCategoryChildsBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/block/category/full/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch CategoryFull
         * @description Fetch CategoryFull
         */
        post: operations["getCategoryFullBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/block/category/item/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch CategoryItem
         * @description Fetch CategoryItem
         */
        post: operations["getCategoryItemBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/block/category/menu/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch CategoryMenu
         * @description Fetch CategoryMenu
         */
        post: operations["getCategoryMenuBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/category/meta": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch CategoryMeta
         * @description Fetch CategoryMeta
         */
        post: operations["getCategoryMetaBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/block/category/nested/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch CategoryNested
         * @description Fetch CategoryNested
         */
        post: operations["getCategoryNestedBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/category/nested/childs": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch CategoryNestedChilds
         * @description Fetch CategoryNestedChilds
         */
        post: operations["getCategoryNestedChildsBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/category/products": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch CategoryProducts
         * @description Fetch CategoryProducts
         */
        post: operations["getCategoryProductsBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/favorites/products": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch FavoritesProducts
         * @description Fetch FavoritesProducts
         */
        post: operations["getFavoritesProductsBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/block/menu/item/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch MenuItem
         * @description Fetch MenuItem
         */
        post: operations["getMenuItemBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/menu/tree": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch MenuTree
         * @description Fetch MenuTree
         */
        post: operations["getMenuTreeBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/block/product/card/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch ProductCard
         * @description Fetch ProductCard
         */
        post: operations["getProductCardBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/block/product/full/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch ProductFull
         * @description Fetch ProductFull
         */
        post: operations["getProductFullBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/block/product/review/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch ProductReview
         * @description Fetch ProductReview
         */
        post: operations["getProductReviewBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/product/reviews": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch ProductReviews
         * @description Fetch ProductReviews
         */
        post: operations["getProductReviewsBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/listing/product/search": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch ProductSearch
         * @description Fetch ProductSearch
         */
        post: operations["getProductSearchBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/block/product/variant/{key}": {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Fetch ProductVariant
         * @description Fetch ProductVariant
         */
        post: operations["getProductVariantBlock"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        String: string;
        Integer: number;
        Float: number;
        Boolean: boolean;
        DateTime: string;
        Any: Record<string, never>;
        Media: {
            key?: components["schemas"]["String"];
            src?: components["schemas"]["String"];
            mimeType?: components["schemas"]["String"];
            altText?: components["schemas"]["String"];
            thumbnailSrc?: components["schemas"]["String"];
            type?: components["schemas"]["String"];
            position?: components["schemas"]["Integer"];
        };
        Price: {
            precision?: components["schemas"]["Integer"];
            currency?: components["schemas"]["String"];
            scales?: components["schemas"]["PriceScale"][];
            amount?: components["schemas"]["Integer"];
            ref?: components["schemas"]["Integer"];
        };
        Seo: {
            title?: components["schemas"]["String"];
            description?: components["schemas"]["String"];
            keywords?: components["schemas"]["String"][];
        };
        Vendor: {
            key?: components["schemas"]["String"];
            label?: components["schemas"]["String"];
            image?: components["schemas"]["Media"];
        };
        Weight: {
            value?: components["schemas"]["Float"];
            unit?: components["schemas"]["String"];
        };
        Option: {
            attribute?: components["schemas"]["String"];
            label?: components["schemas"]["String"];
            value?: components["schemas"]["String"];
        };
        Swatch: {
            label?: components["schemas"]["String"];
            image?: components["schemas"]["Media"];
            color?: components["schemas"]["String"];
        };
        /** @enum {string} */
        Availability: "in-stock" | "out-of-stock" | "preorder" | "backorder";
        /** @enum {string} */
        StockLevel: "low" | "medium" | "high";
        PriceScale: {
            from?: components["schemas"]["Integer"];
            amount?: components["schemas"]["Integer"];
        };
        Sorting: {
            key?: components["schemas"]["String"];
            position?: components["schemas"]["Integer"];
        };
        _page: {
            /** @description The number of items per page */
            limit: number;
            /** @description The current page */
            current: number;
            /** @description The next page */
            next: number;
            /** @description The previous page */
            prev: number;
            /** @description The last page */
            last: number;
        };
        _filter: {
            [key: string]: {
                /** @description The facet option name */
                option: string;
                /** @description The facet option value */
                value: string;
                /** @description The number of items with this facet option */
                count: number;
                /** @description Indicates if the facet option is selected */
                selected?: boolean;
                /** @description Indicates if the filter facet is disabled */
                disabled?: boolean;
            }[];
        };
        _aggregation: {
            [key: string]: {
                total: {
                    /** @description The maximum value for this field */
                    max?: number;
                    /** @description The minimum value for this field */
                    min?: number;
                    /** @description The aggregated average for this field */
                    avg?: number;
                    /** @description The aggregated sum for this field */
                    sum?: number;
                    /** @description The total number of possible values for this field */
                    total: number;
                };
                result: {
                    /** @description The maximum value for this field */
                    max?: number;
                    /** @description The minimum value for this field */
                    min?: number;
                    /** @description The aggregated average for this field */
                    avg?: number;
                    /** @description The aggregated sum for this field */
                    sum?: number;
                    /** @description The total number of possible values for this field */
                    total: number;
                };
            };
        };
        _sort: {
            /** @description The sorting field name */
            field: string;
            /** @description The sort directions for this field */
            orders: ("asc" | "desc")[];
        }[];
        /** @description The total number of items */
        _total: number;
        /** @description Filter results by a set of conditions */
        _searchQueryFilter: {
            /**
             * @description The type of the filter
             * @enum {string}
             */
            type: "equals" | "range" | "contains" | "and" | "or" | "not";
            /** @description The field to filter on */
            field?: string;
            /** @description If the filter has a value (equals, contains), the value to filter by */
            value?: string;
            /** @description If the filter has a range, the start of the range */
            from?: number;
            /** @description If the filter has a range, the end of the range */
            to?: number;
            /** @description If the filter is a composition (and, or, not), the filters to apply */
            filter?: components["schemas"]["_searchQueryFilter"][];
        }[];
        _searchQuerySort: {
            /** @description The field to sort by */
            field: string;
            /**
             * @description The sort direction
             * @enum {string}
             */
            order: "asc" | "desc";
        };
        _searchQueryOptions: {
            filter: components["schemas"]["_searchQueryFilter"];
            sort: components["schemas"]["_searchQuerySort"] | components["schemas"]["_searchQuerySort"][] | string;
            /** @description Limit the number of results returned */
            limit?: number;
            /** @description Paginate results */
            page?: number;
            /** @description Will search fields that are marked as searchable */
            search?: string;
        };
        BrandCard: {
            hero?: components["schemas"]["Media"];
            key: components["schemas"]["String"];
            link?: components["schemas"]["PageRoute"];
            logo?: components["schemas"]["Media"];
            name?: components["schemas"]["String"];
            products?: components["schemas"]["BrandProducts"];
        };
        BrandFull: {
            active?: components["schemas"]["Boolean"];
            description?: components["schemas"]["String"];
            hero?: components["schemas"]["Media"];
            key: components["schemas"]["String"];
            logo?: components["schemas"]["Media"];
            name?: components["schemas"]["String"];
            products?: components["schemas"]["BrandProducts"];
            slug?: components["schemas"]["String"];
        };
        BrandListing: {
            items?: components["schemas"]["BrandCard"][];
            filter?: components["schemas"]["_filter"];
            aggregation?: components["schemas"]["_aggregation"];
            sort?: components["schemas"]["_sort"];
            page?: components["schemas"]["_page"];
            total?: components["schemas"]["_total"];
        };
        BrandProducts: {
            items?: components["schemas"]["ProductCard"][];
            filter?: components["schemas"]["_filter"];
            aggregation?: components["schemas"]["_aggregation"];
            sort?: components["schemas"]["_sort"];
            page?: components["schemas"]["_page"];
            total?: components["schemas"]["_total"];
        };
        CartProducts: {
            items?: components["schemas"]["ProductVariant"][];
            filter?: components["schemas"]["_filter"];
            aggregation?: components["schemas"]["_aggregation"];
            sort?: components["schemas"]["_sort"];
            page?: components["schemas"]["_page"];
            total?: components["schemas"]["_total"];
        };
        CategoryChilds: {
            items?: components["schemas"]["CategoryItem"][];
            filter?: components["schemas"]["_filter"];
            aggregation?: components["schemas"]["_aggregation"];
            sort?: components["schemas"]["_sort"];
            page?: components["schemas"]["_page"];
            total?: components["schemas"]["_total"];
        };
        CategoryFull: {
            active?: components["schemas"]["Boolean"];
            ancestors?: components["schemas"]["String"][];
            breadcrumbs?: components["schemas"]["String"][];
            key: components["schemas"]["String"];
            name?: components["schemas"]["String"];
            orderHint?: components["schemas"]["Float"];
            parent?: components["schemas"]["String"];
            products?: components["schemas"]["CategoryProducts"];
            slug?: components["schemas"]["String"];
        };
        CategoryItem: {
            children?: components["schemas"]["CategoryNestedChilds"];
            key: components["schemas"]["String"];
            link?: components["schemas"]["PageRoute"];
            name?: components["schemas"]["String"];
            orderHint?: components["schemas"]["Float"];
            parent?: components["schemas"]["String"];
        };
        CategoryMenu: {
            ancestors?: components["schemas"]["String"][];
            children?: components["schemas"]["CategoryChilds"];
            key: components["schemas"]["String"];
            link?: components["schemas"]["PageRoute"];
            name?: components["schemas"]["String"];
            orderHint?: components["schemas"]["Float"];
            parent?: components["schemas"]["String"];
        };
        CategoryMeta: {
            item?: components["schemas"]["MenuItem"];
        };
        CategoryNested: {
            key: components["schemas"]["String"];
            link?: components["schemas"]["PageRoute"];
            name?: components["schemas"]["String"];
            orderHint?: components["schemas"]["Float"];
            parent?: components["schemas"]["String"];
        };
        CategoryNestedChilds: {
            items?: components["schemas"]["CategoryNested"][];
            filter?: components["schemas"]["_filter"];
            aggregation?: components["schemas"]["_aggregation"];
            sort?: components["schemas"]["_sort"];
            page?: components["schemas"]["_page"];
            total?: components["schemas"]["_total"];
        };
        CategoryProducts: {
            items?: components["schemas"]["ProductCard"][];
            filter?: components["schemas"]["_filter"];
            aggregation?: components["schemas"]["_aggregation"];
            sort?: components["schemas"]["_sort"];
            page?: components["schemas"]["_page"];
            total?: components["schemas"]["_total"];
        };
        FavoritesProducts: {
            items?: components["schemas"]["ProductCard"][];
            filter?: components["schemas"]["_filter"];
            aggregation?: components["schemas"]["_aggregation"];
            sort?: components["schemas"]["_sort"];
            page?: components["schemas"]["_page"];
            total?: components["schemas"]["_total"];
        };
        MenuItem: {
            active?: components["schemas"]["Boolean"];
            categoryId?: components["schemas"]["String"];
            children?: components["schemas"]["CategoryChilds"];
            description?: components["schemas"]["String"];
            image?: components["schemas"]["Media"];
            key: components["schemas"]["String"];
            link?: components["schemas"]["PageRoute"];
            name?: components["schemas"]["String"];
            path?: components["schemas"]["String"];
        };
        MenuTree: {
            items?: components["schemas"]["MenuItem"][];
            filter?: components["schemas"]["_filter"];
            aggregation?: components["schemas"]["_aggregation"];
            sort?: components["schemas"]["_sort"];
            page?: components["schemas"]["_page"];
            total?: components["schemas"]["_total"];
        };
        ProductCard: {
            brand?: components["schemas"]["String"];
            key: components["schemas"]["String"];
            link?: components["schemas"]["PageRoute"];
            name?: components["schemas"]["String"];
            price?: components["schemas"]["Price"];
            variants?: components["schemas"]["ProductVariant"][];
        };
        ProductFull: {
            active?: components["schemas"]["Boolean"];
            brand?: components["schemas"]["String"];
            categoryIds?: components["schemas"]["String"][];
            description?: components["schemas"]["String"];
            key: components["schemas"]["String"];
            link?: components["schemas"]["PageRoute"];
            name?: components["schemas"]["String"];
            reviews?: components["schemas"]["ProductReviews"];
            slug?: components["schemas"]["String"];
            variants?: components["schemas"]["ProductVariant"][];
        };
        ProductReview: {
            active?: components["schemas"]["Boolean"];
            date?: components["schemas"]["DateTime"];
            key: components["schemas"]["String"];
            name?: components["schemas"]["String"];
            rating?: components["schemas"]["Integer"];
            sku?: components["schemas"]["String"];
            summary?: components["schemas"]["String"];
            text?: components["schemas"]["String"];
        };
        ProductReviews: {
            items?: components["schemas"]["ProductReview"][];
            filter?: components["schemas"]["_filter"];
            aggregation?: components["schemas"]["_aggregation"];
            sort?: components["schemas"]["_sort"];
            page?: components["schemas"]["_page"];
            total?: components["schemas"]["_total"];
        };
        ProductSearch: {
            items?: components["schemas"]["ProductCard"][];
            filter?: components["schemas"]["_filter"];
            aggregation?: components["schemas"]["_aggregation"];
            sort?: components["schemas"]["_sort"];
            page?: components["schemas"]["_page"];
            total?: components["schemas"]["_total"];
        };
        ProductVariant: {
            images?: components["schemas"]["Media"][];
            key: components["schemas"]["String"];
            name?: components["schemas"]["String"];
            options?: components["schemas"]["Option"][];
            price?: components["schemas"]["Price"];
            properties?: components["schemas"]["Option"][];
        };
        /** @description Available query options (filters and sortings) for BrandListing blocks */
        BrandListingQueryOptions: {
            /** @description Sort options for BrandListing blocks */
            sort: Record<string, never>;
            /** @description Filter options for BrandListing blocks */
            filter: Record<string, never>;
        };
        /** @description Available query options (filters and sortings) for BrandProducts blocks */
        BrandProductsQueryOptions: {
            /** @description Sort options for BrandProducts blocks */
            sort: {
                name: components["schemas"]["String"];
                "price.amount": components["schemas"]["Price"]["amount"];
            };
            /** @description Filter options for BrandProducts blocks */
            filter: Record<string, never>;
        };
        /** @description Available query options (filters and sortings) for CartProducts blocks */
        CartProductsQueryOptions: {
            /** @description Sort options for CartProducts blocks */
            sort: Record<string, never>;
            /** @description Filter options for CartProducts blocks */
            filter: Record<string, never>;
        };
        /** @description Available query options (filters and sortings) for CategoryChilds blocks */
        CategoryChildsQueryOptions: {
            /** @description Sort options for CategoryChilds blocks */
            sort: Record<string, never>;
            /** @description Filter options for CategoryChilds blocks */
            filter: Record<string, never>;
        };
        /** @description Available query options (filters and sortings) for CategoryMeta blocks */
        CategoryMetaQueryOptions: {
            /** @description Sort options for CategoryMeta blocks */
            sort: Record<string, never>;
            /** @description Filter options for CategoryMeta blocks */
            filter: Record<string, never>;
        };
        /** @description Available query options (filters and sortings) for CategoryNestedChilds blocks */
        CategoryNestedChildsQueryOptions: {
            /** @description Sort options for CategoryNestedChilds blocks */
            sort: Record<string, never>;
            /** @description Filter options for CategoryNestedChilds blocks */
            filter: Record<string, never>;
        };
        /** @description Available query options (filters and sortings) for CategoryProducts blocks */
        CategoryProductsQueryOptions: {
            /** @description Sort options for CategoryProducts blocks */
            sort: Record<string, never>;
            /** @description Filter options for CategoryProducts blocks */
            filter: Record<string, never>;
        };
        /** @description Available query options (filters and sortings) for FavoritesProducts blocks */
        FavoritesProductsQueryOptions: {
            /** @description Sort options for FavoritesProducts blocks */
            sort: Record<string, never>;
            /** @description Filter options for FavoritesProducts blocks */
            filter: Record<string, never>;
        };
        /** @description Available query options (filters and sortings) for MenuTree blocks */
        MenuTreeQueryOptions: {
            /** @description Sort options for MenuTree blocks */
            sort: {
                order: components["schemas"]["Integer"];
            };
            /** @description Filter options for MenuTree blocks */
            filter: Record<string, never>;
        };
        /** @description Available query options (filters and sortings) for ProductReviews blocks */
        ProductReviewsQueryOptions: {
            /** @description Sort options for ProductReviews blocks */
            sort: {
                date: components["schemas"]["DateTime"];
            };
            /** @description Filter options for ProductReviews blocks */
            filter: {
                rating: components["schemas"]["Integer"];
            };
        };
        /** @description Available query options (filters and sortings) for ProductSearch blocks */
        ProductSearchQueryOptions: {
            /** @description Sort options for ProductSearch blocks */
            sort: {
                brand: components["schemas"]["String"];
                name: components["schemas"]["String"];
                "price.amount": components["schemas"]["Price"]["amount"];
            };
            /** @description Filter options for ProductSearch blocks */
            filter: {
                brand: components["schemas"]["String"];
                "options.": components["schemas"]["String"];
                "options.color-code": components["schemas"]["String"];
                "options.color-label": components["schemas"]["String"];
                "options.finish-code": components["schemas"]["String"];
                "options.finish-label": components["schemas"]["String"];
                "options.search-color": components["schemas"]["String"];
                "options.search-finish": components["schemas"]["String"];
                "options.size": components["schemas"]["String"];
                "price.amount": components["schemas"]["Price"]["amount"];
                "properties.attr-chair-01": components["schemas"]["String"];
                "properties.color-code": components["schemas"]["String"];
                "properties.color-label": components["schemas"]["String"];
                "properties.finish-code": components["schemas"]["String"];
                "properties.finish-label": components["schemas"]["String"];
                "properties.manufacturer": components["schemas"]["String"];
                "properties.new-arrival": components["schemas"]["String"];
                "properties.new arrival": components["schemas"]["String"];
                "properties.productspec": components["schemas"]["String"];
                "properties.product specifications": components["schemas"]["String"];
                "properties.search-color": components["schemas"]["String"];
                "properties.search-finish": components["schemas"]["String"];
                "properties.size": components["schemas"]["String"];
                "properties.test price": components["schemas"]["String"];
                "properties.testpricenew": components["schemas"]["String"];
                "properties.type": components["schemas"]["String"];
            };
        };
        Page: components["schemas"]["EmptyPage"] | components["schemas"]["BrandPage"] | components["schemas"]["CategoryPage"] | components["schemas"]["ProductPage"];
        BrandPage: {
            route: components["schemas"]["RouteMeta"];
            /** @enum {string} */
            type: "Brand";
            /** @enum {string} */
            block: "BrandFull";
            data: components["schemas"]["BrandFull"];
        };
        CategoryPage: {
            route: components["schemas"]["RouteMeta"];
            /** @enum {string} */
            type: "Category";
            /** @enum {string} */
            block: "CategoryFull";
            data: components["schemas"]["CategoryFull"];
        };
        ProductPage: {
            route: components["schemas"]["RouteMeta"];
            /** @enum {string} */
            type: "Product";
            /** @enum {string} */
            block: "ProductFull";
            data: components["schemas"]["ProductFull"];
        };
        EmptyPage: {
            route: components["schemas"]["RouteMeta"];
        };
        PageRoute: {
            href: string;
            path: string;
            slug: string;
            url: string;
        };
        /** @description Used to  tell Google about localized versions of your page */
        AlternateRoute: components["schemas"]["PageRoute"] & {
            /** @description Optional lang code targeted by this version of the page - e.g. 'en' or 'en-us' */
            lang?: string;
            /** @description Locale code from domain settings for this alternate route */
            locale: string;
            /** @description Region code from domain settings for this alternate route */
            region: string;
        };
        RouteMeta: {
            /**
             * @description Defines the route status by using an http status code
             * @enum {integer}
             */
            code: 200 | 301 | 404;
            /** @description Optional redirect to follow when the route is not found / outdated */
            redirect?: components["schemas"]["PageRoute"];
            /** @description Information about the context the route belongs to. Includes suggested route to redirect when mismatch. */
            context?: {
                region: string;
                locale: string;
                suggested?: components["schemas"]["AlternateRoute"];
            };
            /** @description Alternate routes for the page, defined by the projects domain settings */
            alternates?: components["schemas"]["AlternateRoute"][];
        };
    };
    responses: never;
    parameters: {
        /** @description Context key that identifies the user session. If the context key is not provided, a new context will be generated and returned in the response header. */
        FsContextKey: string;
        /** @description A token used to access environments other than the public environment. */
        FsVersionToken: "ecf0818b-fe5f-4a3b-a298-85b5db522625";
        /** @description Secret is used to access the fetch API. */
        FsSecret: string;
        /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
        FsRequestUrl: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    getBrandCardBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BrandCard"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getBrandFullBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BrandFull"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getBrandListingBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BrandListing"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getBrandProductsBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        /** @description Description missing for param */
        requestBody: {
            content: {
                "application/json": components["schemas"]["_searchQueryOptions"] & {
                    param?: {
                        /** @description Description missing for brandKey */
                        brandKey: string;
                    };
                };
            };
        };
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BrandProducts"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCartProductsBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        /** @description Description missing for param */
        requestBody: {
            content: {
                "application/json": components["schemas"]["_searchQueryOptions"] & {
                    param?: {
                        /** @description Description missing for keys */
                        keys: string[];
                    };
                };
            };
        };
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CartProducts"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCategoryChildsBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        /** @description Description missing for param */
        requestBody: {
            content: {
                "application/json": components["schemas"]["_searchQueryOptions"] & {
                    param?: {
                        /** @description Description missing for key */
                        key: string;
                    };
                };
            };
        };
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryChilds"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCategoryFullBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryFull"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCategoryItemBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryItem"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCategoryMenuBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryMenu"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCategoryMetaBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        /** @description Description missing for param */
        requestBody: {
            content: {
                "application/json": components["schemas"]["_searchQueryOptions"] & {
                    param?: {
                        /** @description Description missing for categoryKeys */
                        categoryKeys: string[];
                    };
                };
            };
        };
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryMeta"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCategoryNestedBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryNested"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCategoryNestedChildsBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        /** @description Description missing for param */
        requestBody: {
            content: {
                "application/json": components["schemas"]["_searchQueryOptions"] & {
                    param?: {
                        /** @description Description missing for key */
                        key: string;
                    };
                };
            };
        };
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryNestedChilds"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCategoryProductsBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        /** @description Description missing for param */
        requestBody: {
            content: {
                "application/json": components["schemas"]["_searchQueryOptions"] & {
                    param?: {
                        /** @description Description missing for key */
                        key: string;
                    };
                };
            };
        };
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CategoryProducts"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getFavoritesProductsBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        /** @description Description missing for param */
        requestBody: {
            content: {
                "application/json": components["schemas"]["_searchQueryOptions"] & {
                    param?: {
                        /** @description Description missing for keys */
                        keys: string[];
                    };
                };
            };
        };
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["FavoritesProducts"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getMenuItemBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MenuItem"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getMenuTreeBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["MenuTree"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getProductCardBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductCard"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getProductFullBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductFull"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getProductReviewBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductReview"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getProductReviewsBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        /** @description Description missing for param */
        requestBody: {
            content: {
                "application/json": components["schemas"]["_searchQueryOptions"] & {
                    param?: {
                        /** @description Description missing for key */
                        key: string;
                    };
                };
            };
        };
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductReviews"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getProductSearchBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path?: never;
            cookie?: never;
        };
        /** @description Description missing for param */
        requestBody?: {
            content: {
                "application/json": components["schemas"]["_searchQueryOptions"] & {
                    param?: {
                        /** @description Description missing for categoryKey */
                        categoryKey?: string;
                    };
                };
            };
        };
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductSearch"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getProductVariantBlock: {
        parameters: {
            query?: never;
            header?: {
                /** @description The Frontend URL that is requesting the resource. Can be used to map view block requests to specific pages and get advanced insight into frontend behavior. */
                "fs-request-url"?: components["parameters"]["FsRequestUrl"];
            };
            path: {
                /** @description Description missing for key */
                key: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Found */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ProductVariant"];
                };
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
