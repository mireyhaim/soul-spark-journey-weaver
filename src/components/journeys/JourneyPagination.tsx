
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface JourneyPaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const JourneyPagination: React.FC<JourneyPaginationProps> = ({ 
  currentPage, 
  totalPages, 
  handlePageChange 
}) => {
  if (totalPages <= 1) return null;
  
  return (
    <Pagination className="mt-10">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            className={`${currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-spirit-50"}`}
          />
        </PaginationItem>
        
        {[...Array(totalPages)].map((_, i) => (
          <PaginationItem key={i + 1}>
            <PaginationLink
              onClick={() => handlePageChange(i + 1)}
              isActive={currentPage === i + 1}
              className={`cursor-pointer transition-colors ${
                currentPage === i + 1 
                  ? 'bg-spirit-100 text-spirit-700 border border-spirit-200 font-medium'
                  : 'hover:bg-spirit-50 hover:text-spirit-700'
              }`}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer hover:bg-spirit-50"}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default JourneyPagination;
