'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { Pagination as PaginationType } from '@/lib/types/blog';

interface BlogPaginationProps {
  pagination: PaginationType;
}

export function BlogPagination({ pagination }: BlogPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  if (pagination.totalPages <= 1) {
    return null;
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `/blog?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    router.push(createPageUrl(page));
  };

  const currentPage = pagination.page;
  const totalPages = pagination.totalPages;

  // Calculate page range to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <UIPagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={createPageUrl(currentPage - 1)}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}

        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href={createPageUrl(page)}
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext
              href={createPageUrl(currentPage + 1)}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </UIPagination>
  );
}





