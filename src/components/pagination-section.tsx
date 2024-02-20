import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
    pages: number
    items: number
    page: number
}


export   function PaginationSection( {items, page, pages}: PaginationProps) {
    const [, setSearchParams] = useSearchParams()

    function nextPage() {
        

        if(page  + 1 > pages) {
            return
        }


        setSearchParams(params => {
            params.set('page', String(page + 1))
            return params
        })
    }
    function lastPage() {
        setSearchParams(params => {
            params.set('page',  String(pages))
            return params
        })
    }
    function firstPage() {
        setSearchParams(params => {
            params.set('page',  '1')
            return params
        })
    }
    function prevPage() {
        if(page - 1 <= 0) {
            return
        }
        setSearchParams(params => {
            params.set('page', String(page - 1))
            return params
        })
    }
    
    return (
        <div className="flex flex-row justify-between items-center select-none">
            <p>10 of {items} items</p>
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-row gap-2 items-center">
                <p className="text-neutral-400 text-sm">Page {page} of {pages}</p>
              </div>
              <Pagination>
                <PaginationContent >
                  <PaginationItem onClick={firstPage}>
                    <PaginationLink>
                      <ChevronsLeft size={18} />
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem onClick={prevPage}>
                    <PaginationLink>
                      <ChevronLeft size={18} />
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem onClick={nextPage}>
                    <PaginationLink >
                      <ChevronRight size={18} />
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem onClick={lastPage}>
                    <PaginationLink>
                      <ChevronsRight size={18} />
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
    );
}

;