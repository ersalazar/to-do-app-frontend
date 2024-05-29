import { PaginatedTodos, PaginationProps } from "@/utils/types";
import React from "react";


export default function PaginationControl({
    totalPages,
    currentPage,
    handlePrevPage,
    handleNextPage,
    handleFirstPage,
    handleLastPage
}: PaginationProps) {



    return (
        <div className="flex items-center justify-center space-x-2 mt-4 border border-black p-2 rounded-md shadow-sm shadow-black">
            <button 
                aria-label="navtoFirst"
                onClick={handleFirstPage}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={currentPage === 1}
            >
                {"<<"}
            </button>
            <button
                aria-label="navToPrev"
                onClick={handlePrevPage}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={currentPage === 1}
            >
                {"<"}
            </button>
            <span className="px-3 py-1 bg-gray-2000 rounded">
                Page {currentPage} of {totalPages}
            </span>
            <button
                aria-label="navToNext"
                onClick={handleNextPage}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={currentPage === totalPages}
            >
                {">"}
            </button>
            <button
                aria-label="navToLast"
                onClick={handleLastPage}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={currentPage === totalPages}
            >
                {">>"}
            </button>
        </div>
    );
}
