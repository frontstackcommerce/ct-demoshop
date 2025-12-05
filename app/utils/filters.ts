import type { EqualsFilter, LogicalFilter } from '~~/.frontstack/query-types'
import type { components } from '~~/.frontstack/fetch-api'
import type { ListingQueryFilters } from '~~/.frontstack/generated-types'

type QueryFilter = ListingQueryFilters['ProductSearch']

type FilterField = keyof components['schemas']['ProductSearchQueryOptions']['filter'] & string
type FilterMode = 'and' | 'or'

type FilterValue = QueryFilter[keyof QueryFilter]

/**
 * Creates an equals filter for the API query
 */
export function makeEqualsFilter<T>(
  field: keyof T & string,
  value: T[keyof T] | T[keyof T][]
): EqualsFilter<T> {
  return {
    type: 'equals',
    field,
    value,
  } as EqualsFilter<T>
}

/**
 * Creates a logical filter (AND/OR) for the API query
 */
export function makeLogicalFilter<T>(
  type: FilterMode,
  filters: EqualsFilter<T>[]
): LogicalFilter<T>[] {
  return filters.length > 0
    ? [
        {
          type,
          filter: filters,
        },
      ]
    : []
}

/**
 * Extracts active filters from the API response
 */
export function makeFilterState<T extends { filter?: components['schemas']['_filter'] }>(
  filters: T['filter']
): Record<string, any> {
  const result: Record<string, any> = {}

  if (!filters) return result

  for (const key in filters) {
    if (Object.hasOwn(filters, key)) {
      const selectedItems = filters[key]?.filter((item) => item.selected) || []
      if (selectedItems.length > 0) {
        result[key] = selectedItems
      }
    }
  }
  return result
}

/**
 * Toggles filter state with filter options
 */
export function toggleFilterState<T extends { filter?: components['schemas']['_filter'] }>(
  filters: T['filter'],
  filterField: FilterField,
  filterOption: FilterValue
): T['filter'] {
  if (!filters) return filters

  // Create a deep copy to avoid mutating the original
  const updatedFilters = JSON.parse(JSON.stringify(filters))

  // Safely update the filter if it exists
  try {
    // Using optional chaining and type assertion to handle the filter safely
    const filterOptions = (updatedFilters as any)[filterField]
    if (Array.isArray(filterOptions)) {
      const optionIndex = filterOptions.findIndex((option) => option.value === filterOption)
      if (optionIndex !== -1) {
        // Toggle the selected state instead of setting to true
        filterOptions[optionIndex].selected = true
      }
    }
  } catch (error) {
    console.error('Error updating filter:', error)
  }

  return updatedFilters
}

/**
 * Sets filter state with filter options
 */
export function setFilterState<T extends { filter?: components['schemas']['_filter'] }>(
  filters: T['filter'],
  filterField: FilterField,
  filterValues: FilterValue[]
): T['filter'] {
  if (!filters) return filters

  // Create a deep copy to avoid mutating the original
  const updatedFilters = JSON.parse(JSON.stringify(filters))

  // Safely update the filter if it exists
  try {
    // Using optional chaining and type assertion to handle the filter safely
    const options = (updatedFilters as any)[filterField]
    if (Array.isArray(options)) {
      options.forEach((option) => {
        option.selected = filterValues.includes(option.value)
      })
    }
  } catch (error) {
    console.error('Error updating filter:', error)
  }

  return updatedFilters
}

/**
 * Manages filter operations (add/remove/update) on a filter list
 */
export function manageFilter<T>(
  filterList: EqualsFilter<T>[],
  field: keyof T & string,
  value: T[keyof T] | T[keyof T][]
): EqualsFilter<T>[] {
  const existingIndex = filterList.findIndex((filter) => filter.field === field)
  const newFilter = makeEqualsFilter<T>(field, value)

  if (existingIndex !== -1) {
    const newList = [...filterList]
    newList[existingIndex] = newFilter
    return newList
  }

  return [...filterList, newFilter]
}

/**
 * Removes a filter from a filter list
 */
export function removeFilter<T>(
  filterList: EqualsFilter<T>[],
  field: keyof T & string,
  option?: T[keyof T]
): EqualsFilter<T>[] {
  if (!option) {
    return filterList.filter((filter) => filter.field !== field)
  }

  const existingFilter = filterList.find((filter) => filter.field === field)
  if (!existingFilter) return filterList

  const currentValues = Array.isArray(existingFilter.value)
    ? existingFilter.value
    : [existingFilter.value]
  const newValues = currentValues.filter((value) => value !== option)

  if (newValues.length === 0) {
    return filterList.filter((filter) => filter.field !== field)
  }

  return manageFilter(filterList, field, newValues)
}
