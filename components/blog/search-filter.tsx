'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Category } from '@/lib/types/blog';
import { useDebounce } from '@/hooks/use-debounce';

interface SearchFilterProps {
  categories?: Category[];
  currentCategory?: string;
  currentSearch?: string;
  currentSortBy?: string;
  currentSortOrder?: 'asc' | 'desc';
}

export function SearchFilter({
  categories = [],
  currentCategory,
  currentSearch = '',
  currentSortBy = 'published_date',
  currentSortOrder = 'desc',
}: SearchFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(currentSearch);
  const debouncedSearch = useDebounce(searchValue, 500);
  const isInitialMount = useRef(true);
  const previousSearchRef = useRef(currentSearch);

  // Get selected category name
  const selectedCategory = categories.find((cat) => cat.id === currentCategory);

  // Check if any filters are active
  const hasActiveFilters =
    Boolean(currentSearch) ||
    Boolean(currentCategory) ||
    currentSortBy !== 'published_date' ||
    currentSortOrder !== 'desc';

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      // Reset to page 1 when filters change
      params.set('page', '1');

      router.push(`/blog?${params.toString()}`);
    },
    [router, searchParams]
  );

  // Update URL when debounced search changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      previousSearchRef.current = debouncedSearch;
      return;
    }

    // Only update if the debounced value actually changed
    if (debouncedSearch !== previousSearchRef.current) {
      previousSearchRef.current = debouncedSearch;
      updateParams({ search: debouncedSearch || null });
    }
  }, [debouncedSearch, updateParams]);

  // Sync search value with URL param changes
  useEffect(() => {
    if (currentSearch !== searchValue) {
      setSearchValue(currentSearch);
    }
  }, [currentSearch]);

  const handleCategoryChange = (value: string) => {
    updateParams({ category: value === 'all' ? null : value });
  };

  const handleSortByChange = (value: string) => {
    updateParams({ sortBy: value });
  };

  const handleSortOrderChange = (value: string) => {
    updateParams({ sortOrder: value });
  };

  const clearSearch = () => {
    setSearchValue('');
    previousSearchRef.current = '';
    updateParams({ search: null });
  };

  const clearAllFilters = () => {
    setSearchValue('');
    previousSearchRef.current = '';
    updateParams({
      search: null,
      category: null,
      sortBy: null,
      sortOrder: null,
    });
  };

  return (
    <div className="space-y-4 mb-8">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10 pr-10"
        />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {currentSearch && (
            <Badge variant="secondary" className="gap-1">
              Search: {currentSearch}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={clearSearch}
                aria-label="Remove search filter"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1">
              Category: {selectedCategory.name}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleCategoryChange('all')}
                aria-label="Remove category filter"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {currentSortBy !== 'published_date' && (
            <Badge variant="secondary" className="gap-1">
              Sort: {currentSortBy === 'title' ? 'Title' : 'Views'}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleSortByChange('published_date')}
                aria-label="Reset sort"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {currentSortOrder !== 'desc' && (
            <Badge variant="secondary" className="gap-1">
              Order: {currentSortOrder === 'asc' ? 'Ascending' : 'Descending'}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => handleSortOrderChange('desc')}
                aria-label="Reset order"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="h-7 text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filters Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Filter */}
        <Select
          value={currentCategory || 'all'}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full sm:w-[220px]">
            <SelectValue placeholder="All Categories">
              {selectedCategory ? (
                <span className="flex items-center gap-2">
                  {selectedCategory.name}
                  <Badge variant="outline" className="text-xs">
                    {selectedCategory.post_count}
                  </Badge>
                </span>
              ) : (
                'All Categories'
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.length > 0 ? (
              categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center justify-between w-full">
                    <span>{category.name}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {category.post_count}
                    </Badge>
                  </div>
                </SelectItem>
              ))
            ) : (
              <SelectItem value="none" disabled>
                No categories available
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={currentSortBy} onValueChange={handleSortByChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="published_date">Published Date</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="views">Views</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Order */}
        <Select value={currentSortOrder} onValueChange={handleSortOrderChange}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">Descending</SelectItem>
            <SelectItem value="asc">Ascending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

