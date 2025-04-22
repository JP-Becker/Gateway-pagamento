import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalResults: number
  resultsPerPage: number
}

export function Pagination({ currentPage, totalPages, totalResults, resultsPerPage }: PaginationProps) {
  const startResult = (currentPage - 1) * resultsPerPage + 1
  const endResult = Math.min(currentPage * resultsPerPage, totalResults)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-400">
      <div>
        Mostrando {startResult} - {endResult} de {totalResults} resultados
      </div>
      <div className="flex items-center gap-1 mt-2 sm:mt-0">
        <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === 1} asChild>
          <Link href={`?page=${currentPage - 1}`}>
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            className={`h-8 w-8 ${page === currentPage ? "bg-indigo-600" : "bg-secondary"}`}
            asChild
          >
            <Link href={`?page=${page}`}>{page}</Link>
          </Button>
        ))}
        <Button variant="outline" size="icon" className="h-8 w-8" disabled={currentPage === totalPages} asChild>
          <Link href={`?page=${currentPage + 1}`}>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}
